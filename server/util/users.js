const User = require("../models/userModel")
const Room = require("../models/roomModel")
const Message = require("../models/messageModel")

const activeUsers = []

// Join user to chat
const userJoin = async (id, user, room) => {
  const selectedRoom = await Room.findOne({ roomName: room })

  user.connectionId = id

  // if user is already in room
  if (selectedRoom?.connectedUsers?.includes(user._id)) return

  activeUsers.push({ user, room })

  if (selectedRoom) {
    // if room already existed

    console.log(`${user.username} has joined ${room} room`)

    await Room.updateOne(
      { roomName: room },
      { $push: { connectedUsers: user._id } }
    )
  } else {
    // if room should be created

    console.log(`${user.username} has created and joined ${room} room`)

    await Room.create({
      roomName: room,
      connectedUsers: [user._id],
      messages: [],
    })
  }

  return { id, username: user.username, room }
}

// User leaves chat
const userLeave = async (user, room) => {
  if (!user) return

  console.log(`${user.username} has left ${room} room`)

  const index = activeUsers.map((activeUser) => activeUser.user).indexOf(user)

  if (index !== -1) {
    activeUsers.splice(index, 1)
  }

  await Room.updateOne(
    { roomName: room },
    { $pull: { connectedUsers: { $in: [user._id] } } }
  )
}

// Get room users
const getRoomUsers = async (room) => {
  const selectedRoom = await Room.findOne({ roomName: room })

  if (!selectedRoom) return []

  const roomUsers = await Promise.all(
    selectedRoom.connectedUsers.map(
      async (userId) => await User.findById(userId)
    )
  )

  const usersToSend = roomUsers.map((user) => user.username)

  return usersToSend

  // return users.filter((user) => user.room === room)
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers,
}
