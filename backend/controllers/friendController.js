const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const createNotification = require("../utils/createNotification");

// 1. Send Friend Request
exports.sendFriendRequest = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const recipientId = req.params.id;

  if (senderId.equals(recipientId)) {
    return res.status(400).json({ msg: "You can't send request to yourself." });
  }

  const recipient = await User.findById(recipientId);
  if (!recipient) return res.status(404).json({ msg: "User not found" });

  if (
    recipient.friendRequests.includes(senderId) ||
    recipient.friends.includes(senderId)
  ) {
    return res.status(400).json({ msg: "Already sent or already friends" });
  }

  recipient.friendRequests.push(senderId);
  await recipient.save();

  // 🔔 Notification to recipient
  await createNotification({
    user: recipientId,
    fromUser: senderId,
    type: "friend_request",
    content: "You received a new friend request",
  });

  res.status(200).json({ msg: "Friend request sent" });
});

// 2. View Friend Requests
exports.getFriendRequests = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "friendRequests",
    "username email"
  );
  res.status(200).json({ requests: user.friendRequests });
});

// 3. Accept Friend Request
exports.acceptFriendRequest = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const senderId = req.params.id;

  if (!currentUser.friendRequests.includes(senderId)) {
    return res.status(400).json({ msg: "No such request" });
  }

  currentUser.friendRequests.pull(senderId);
  currentUser.friends.push(senderId);
  await currentUser.save();

  const sender = await User.findById(senderId);
  sender.friends.push(req.user._id);
  await sender.save();

  // 🔔 Notify sender about acceptance
  await createNotification({
    user: senderId,
    fromUser: req.user._id,
    type: "friend_accept",
    content: `${currentUser.username} accepted your friend request`,
  });

  res.status(200).json({ msg: "Friend request accepted" });
});

// 4. Reject Friend Request
exports.rejectFriendRequest = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const senderId = req.params.id;

  currentUser.friendRequests.pull(senderId);
  await currentUser.save();

  // 🔔 Notify sender about rejection
  await createNotification({
    user: senderId,
    fromUser: req.user._id,
    type: "friend_reject",
    content: `${currentUser.username} rejected your friend request`,
  });

  res.status(200).json({ msg: "Friend request rejected" });
});

// 5. Unfriend User
exports.unfriendUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const targetId = req.params.id;

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetId);

  if (!user.friends.includes(targetId)) {
    return res.status(400).json({ msg: "You are not friends" });
  }

  user.friends.pull(targetId);
  targetUser.friends.pull(userId);

  await user.save();
  await targetUser.save();

  // 🔔 Notify unfriended user
  await createNotification({
    user: targetId,
    fromUser: userId,
    type: "unfriend",
    content: `${user.username} removed you from their friends`,
  });

  res.status(200).json({ msg: "User unfriended" });
});

// Block a user
exports.blockUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.id;

  if (userId.toString() === targetUserId) {
    res.status(400);
    throw new Error("You cannot block yourself");
  }

  const user = await User.findById(userId);
  if (user.blockedUsers.includes(targetUserId)) {
    res.status(400);
    throw new Error("User already blocked");
  }

  user.blockedUsers.push(targetUserId);
  await user.save();

  res.status(200).json({ msg: "User blocked successfully" });
});

// Unblock a user
exports.unblockUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.id;

  const user = await User.findById(userId);
  user.blockedUsers = user.blockedUsers.filter(
    (id) => id.toString() !== targetUserId
  );

  await user.save();
  res.status(200).json({ msg: "User unblocked successfully" });
});

// View all blocked users
exports.getBlockedUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "blockedUsers",
    "username email"
  );
  res.status(200).json({ blockedUsers: user.blockedUsers });
});
