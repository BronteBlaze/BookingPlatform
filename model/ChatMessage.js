const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userMessages: [
    {
      userId: {
        type: String,
      },
      message: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);

//  userId: "",
//userMessages: [{ socketId: "", message: "" }],
