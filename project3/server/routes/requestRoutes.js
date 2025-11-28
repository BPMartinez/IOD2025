const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRequest,
  getMyRequests,
  getRequestsSentToMe,
  updateRequestStatus,
  updatePlaydateInfo,
  deleteRequest,
} = require("../controllers/requestController");

router.use(authMiddleware);

router.post("/", createRequest);
router.get("/", getMyRequests);           
router.get("/inbound", getRequestsSentToMe); 
router.put("/:id/status", updateRequestStatus);
router.put("/:id/playdate", updatePlaydateInfo);
router.delete("/:id", deleteRequest);

module.exports = router;
