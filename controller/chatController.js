const ChatMessage = require("../model/ChatMessage");

exports.getChats = async (req, res, next) => {
  // userMessages: [{ socketId: "", message: "" }],
  const { userId } = req.query;
  try {
    const chats = await ChatMessage.findOne({ userId: userId });
    if (chats?.userId) {
      return res.status(200).json({
        message: "Fetched Successfully",
        allMessages: chats.userMessages,
      });
    }
    return res.status(200).json({ message: "No Chats", allMessages: [] });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
