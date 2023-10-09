const mongoose = require("mongoose")

const roomSchema = mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      unique: true,
    },
    connectedUsers: [{ type: mongoose.Schema.Types.ObjectId }],
    messages: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Room", roomSchema)
