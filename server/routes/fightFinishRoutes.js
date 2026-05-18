const express = require('express');

const {
  getAll,
  getSingleFinish,
  createFinish,
  updateFinish,
  deleteFinish,
} = require('../controllers/fightsfinishController');
const {
  authenticateUser,
  authorizePermissions,
  preventDemoAdminDeletes,
} = require('../middleware/authentication');

const router = express.Router();

router.get('/', getAll);
router.post('/', [authenticateUser, authorizePermissions('admin')], createFinish);
router.patch('/:id', [authenticateUser, authorizePermissions('admin')], updateFinish);
router.get('/:id', getSingleFinish);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin'), preventDemoAdminDeletes],
  deleteFinish
);

module.exports = router;
