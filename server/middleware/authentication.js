const { isTokenValid, attachCookiesToResponse } = require('../utils');
const Token = require('../models/Token');
const User = require('../models/User');
const { UnauthenticatedError, UnauthorizedError } = require('../errors');

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

const preventDemoAdminDeletes = async (req, res, next) => {
  const demoAdminEmail =
    process.env.DEMO_ADMIN_EMAIL || 'demo-admin@example.com';

  if (req.user?.isDemoAdmin || req.user?.email === demoAdminEmail) {
    throw new UnauthorizedError(
      'Demo admin can create and edit, but cannot delete records'
    );
  }

  const user = await User.findById(req.user.userId).select('email').lean();
  if (user?.email === demoAdminEmail) {
    throw new UnauthorizedError(
      'Demo admin can create and edit, but cannot delete records'
    );
  }

  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
  preventDemoAdminDeletes,
};
