const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getSchoolNetwork,
  createChildProfile,
  updateChildProfile,
  deleteChildProfile,
} = require("../controllers/familyController");

router.get("/network", auth, getSchoolNetwork);
router.post("/children", auth, createChildProfile);
router.put("/children/:childId", auth, updateChildProfile);
router.delete("/children/:childId", auth, deleteChildProfile);

module.exports = router;

