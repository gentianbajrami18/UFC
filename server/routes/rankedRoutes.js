const express = require("express");
const router = express.Router();
const {
  getAllRanked,
  getOneRanked,
  createRanked,
  updateRanked,
  deleteRanked,
} = require("../controllers/rankedController");
const {
  authenticateUser,
  authorizePermissions,
  preventDemoAdminDeletes,
} = require("../middleware/authentication");

// Admin-only routes for ranked entries
router.get("/", getAllRanked);
router.get("/:id", getOneRanked);
router.post(
  "/",
  [authenticateUser, authorizePermissions("admin")],
  createRanked,
);
router.patch(
  "/:id",
  [authenticateUser, authorizePermissions("admin")],
  updateRanked,
);
router.delete(
  "/:id",
  [authenticateUser, authorizePermissions("admin"), preventDemoAdminDeletes],
  deleteRanked,
);

module.exports = router;
