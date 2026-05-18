const express = require('express');

const {
  getAll,
  getSingleQuote,
  createQuote,
  updateQuote,
  deleteQuote,
} = require('../controllers/quoteController');
const {
  authenticateUser,
  authorizePermissions,
  preventDemoAdminDeletes,
} = require('../middleware/authentication');

const router = express.Router();

router.get('/', getAll);
router.post(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  createQuote
);
router.patch(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateQuote
);
router.get('/:id', getSingleQuote);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin'), preventDemoAdminDeletes],
  deleteQuote
);

module.exports = router;
