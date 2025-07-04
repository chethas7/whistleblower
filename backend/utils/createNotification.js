const Notification = require("../models/notificationModel");

const createNotification = async ({ user, fromUser, type, content }) => {
  try {
    await Notification.create({
      user,
      fromUser,
      type,
      content,
    });
  } catch (error) {
    console.error("Notification error:", error.message);
  }
};

module.exports = createNotification;
