const {
  BadRequestError,
  UnauthenticatedError,
} = require('../errors/index');
const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const {
  createTokenUser,
  attachCookiesToResponse,
  sendResetPasswordEmail,
  createHash,
} = require('../utils');

const demoAdminDefaults = {
  email: 'demo-admin@example.com',
  firstName: 'UFC',
  lastName: 'Admin',
  country: 'United States',
};

const getClientOrigin = req => {
  const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
  const requestOrigin = req.get('origin');

  return requestOrigin && allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0] || 'http://localhost:5173';
};

const register = async (req, res) => {
  const { firstName, lastName, password, country } = req.body;
  const email = req.body.email?.toLowerCase().trim();

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    if (!emailAlreadyExists.isVerified) {
      emailAlreadyExists.firstName = firstName;
      emailAlreadyExists.lastName = lastName;
      emailAlreadyExists.password = password;
      emailAlreadyExists.country = country;
      emailAlreadyExists.isVerified = true;
      emailAlreadyExists.verified = Date.now();
      emailAlreadyExists.verificationToken = undefined;
      await emailAlreadyExists.save();

      return res.status(StatusCodes.OK).json({
        msg: 'Account activated. You can log in now.',
      });
    }

    throw new BadRequestError('Email already exists');
  }

  const role = (await User.countDocuments()) === 0 ? 'admin' : 'user';

  await User.create({
    firstName,
    lastName,
    email,
    password,
    country,
    role,
    isVerified: true,
    verified: Date.now(),
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'Account created. You can log in now.',
  });
};

const createUserSession = async ({ req, res, user }) => {
  const tokenUser = createTokenUser(user);

  let refreshToken = '';

  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    return tokenUser;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  return tokenUser;
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Verification Failed!');
  }
  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Verification Failed!');
  }

  user.isVerified = true;
  user.verified = Date.now();

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  if (!user.verified) {
    throw new UnauthenticatedError('Please verify email!');
  }

  const tokenUser = await createUserSession({ req, res, user });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const demoAdminLogin = async (req, res) => {
  const demoAdminEmail =
    process.env.DEMO_ADMIN_EMAIL || demoAdminDefaults.email;

  let user = await User.findOne({ email: demoAdminEmail });

  if (!user) {
    user = await User.create({
      ...demoAdminDefaults,
      email: demoAdminEmail,
      password:
        process.env.DEMO_ADMIN_PASSWORD ||
        crypto.randomBytes(24).toString('hex'),
      role: 'admin',
      isVerified: true,
      verified: Date.now(),
    });
  } else {
    if (user.email === demoAdminDefaults.email || user.firstName === 'Demo') {
      user.firstName = demoAdminDefaults.firstName;
      user.lastName = demoAdminDefaults.lastName;
      user.country = demoAdminDefaults.country;
    }
    user.role = 'admin';
    user.isVerified = true;
    user.verified = user.verified || Date.now();
    user.verificationToken = undefined;
    await user.save();
  }

  const tokenUser = await createUserSession({ req, res, user });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError('Please provide valid email');
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex');
    // send email
    const origin = getClientOrigin(req);
    await sendResetPasswordEmail({
      name: user.firstName,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' });
};
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new BadRequestError('Please provide token,email and password');
  }
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: 'Password Updated' });
};

module.exports = {
  register,
  login,
  demoAdminLogin,
  logout,
  verifyEmail,
  resetPassword,
  forgotPassword,
};
