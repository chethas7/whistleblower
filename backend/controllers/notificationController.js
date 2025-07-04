const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

// Get all notifications for logged-in user
exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("fromUser", "username email");
  res.status(200).json(notifications);
});

// Mark one notification as read
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }
  if (notification.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized access");
  }

  notification.isRead = true;
  await notification.save();
  res.status(200).json({ msg: "Notification marked as read" });
});

// Delete notification
exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }
  if (notification.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  await notification.remove();
  res.status(200).json({ msg: "Notification deleted" });
});
