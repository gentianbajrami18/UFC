const express = require('express');
const {
  login,
  demoAdminLogin,
  logout,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/demo-admin', demoAdminLogin);
router.delete('/logout', authenticateUser, logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
