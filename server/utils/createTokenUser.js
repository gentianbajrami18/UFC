const createTokenUser = user => {
  const demoAdminEmail =
    process.env.DEMO_ADMIN_EMAIL || 'demo-admin@example.com';

  return {
    firstName: user.firstName,
    userId: user._id,
    role: user.role,
    email: user.email,
    isDemoAdmin: user.email === demoAdminEmail,
  };
};

module.exports = createTokenUser;
