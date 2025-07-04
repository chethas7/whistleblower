const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  unfriendUser,
  blockUser,
  getBlockedUsers,
  unblockUser,
} = require("../controllers/friendController");

router.post("/request/:id", protect, sendFriendRequest);
router.get("/requests", protect, getFriendRequests);
router.post("/accept/:id", protect, acceptFriendRequest);
router.post("/reject/:id", protect, rejectFriendRequest);
router.delete("/remove/:id", protect, unfriendUser);

router.post("/block/:id", protect, blockUser);
router.post("/unblock/:id", protect, unblockUser);
router.get("/blocked-users", protect, getBlockedUsers);

module.exports = router;
