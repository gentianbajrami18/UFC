const express = require('express');

const {
  getAll,
  getSingleFighter,
  createFighter,
  updateFighter,
  deleteFighter,
  updateFighterRecord,
} = require('../controllers/fighterController');
const {
  authenticateUser,
  authorizePermissions,
  preventDemoAdminDeletes,
} = require('../middleware/authentication');

const router = express.Router();

router.get('/', getAll);
router.post('/', [authenticateUser, authorizePermissions('admin')], createFighter);
router.get(
  '/updateRecord/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateFighterRecord
);
router.patch('/:id', [authenticateUser, authorizePermissions('admin')], updateFighter);
router.get('/:id', getSingleFighter);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin'), preventDemoAdminDeletes],
  deleteFighter
);

module.exports = router;
