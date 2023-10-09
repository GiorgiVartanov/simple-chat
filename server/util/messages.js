const Room = require("../models/roomModel")
const Message = require("../models/messageModel")
const User = require("../models/userModel")

const saveMessage = async (message, user, room) => {
  const savedMessage = await Message.create({ user: user.id, text: message })

  await Room.updateOne(
    { roomName: room },
    { $push: { messages: savedMessage._id } }
  )

  return savedMessage._id
}

const getMessagesForRoom = async (roomName) => {
  const room = await Room.findOne({ roomName: roomName })

  if (!room) return []

  const messages = await Promise.all(
    room.messages.map(async (messageId) => {
      const message = await Message.findById(messageId)
      const user = await User.findById(message.user)

      return { _id: message._id, text: message.text, user: user.username }
    })
  )

  return messages
}

module.exports = { saveMessage, getMessagesForRoom }
