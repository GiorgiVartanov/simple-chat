const express = require("express")
const cors = require("cors")
const http = require("http")
const jwt = require("jsonwebtoken")
const { Server } = require("socket.io")
const { ObjectId } = require("mongodb")

const User = require("./models/userModel")
const Room = require("./models/roomModel")
const Message = require("./models/messageModel")

const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

const { userJoin, userLeave, getRoomUsers } = require("./util/users")
const { saveMessage, getMessagesForRoom } = require("./util/messages")

const apiRouter = express.Router()

require("dotenv").config()

const PORT = process.env.PORT | 5000

connectDB()

const app = express()

app.use(cors())

const server = http.createServer(app)

// only one io object should be created
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})

// middleware to check if user is logged in
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token

    if (!token) {
      throw new Error("Token was not provided")
    }

    // verify the token and get user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      throw new Error("User not found")
    }

    // attach the user object to the socket for future use
    socket.user = user

    next()
  } catch (error) {
    console.error(error)
    next(new Error("Authentication failed"))
  }
})

// runs when user connects
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  // listening for joinRoom event
  socket.on("joinRoom", async ({ room }) => {
    const user = socket.user

    await userJoin(socket.id, user, room)

    if (!user) return

    socket.join(room)
    socket.join(user.username) // this user also joins a room that is named after them, so it will be possible to send data just to them

    const messages = await getMessagesForRoom(room)
    const roomUsers = await getRoomUsers(room)

    // const message = `${user.username} has joined a chat`
    // const server = {
    //   username: "server",
    //   _id: new ObjectId("65241bfa67bef7f6ac07634b"),
    // }
    // saveMessage(message, server, room)

    // // sends message to room when new user connects to it
    // socket.broadcast.to(user.room).emit("serverMessage", {
    //   message: message,
    // })

    // sends users and room info after new user entered
    io.to(room).emit("roomUsers", {
      room: room,
      users: roomUsers,
    })

    // sends data to user who just joined
    io.to(user.username).emit("joinData", {
      messages: messages,
      roomUsers: roomUsers,
    })
  })

  // listening for leaveRoom event
  socket.on("leaveRoom", async () => {
    const user = socket.user
    const room = socket.room

    userLeave(user, room)

    if (!user) return

    // const message = `${user.username} has left a chat`
    // const server = {
    //   username: "server",
    //   _id: new ObjectId("65241bfa67bef7f6ac07634b"),
    // }
    // saveMessage(message, server, room)

    // io.to(room).emit("serverMessage", {
    //   message: message,
    // })

    // sends users and room info after user leaves room
    io.to(room).emit("roomUsers", {
      room: room,
      users: await getRoomUsers(room),
    })
  })

  // listening for chatMessage event
  socket.on("chatMessage", async ({ message, room }) => {
    const user = socket.user

    console.log(`${user.username} sent a message to ${room} room`)

    const messageId = await saveMessage(message, user, room)

    // sends a message to all users in a same room (except user who sent this message)
    socket.to(room).emit("message", {
      user: user.username,
      text: message,
      _id: messageId,
    })
  })

  // runs when client disconnects
  socket.on("disconnect", async () => {
    const user = socket.user
    const room = socket.room

    userLeave(user, room)

    if (!user) return

    // const message = `${user.username} has left a chat`
    // const server = {
    //   username: "server",
    //   _id: new ObjectId("65241bfa67bef7f6ac07634b"),
    // }
    // saveMessage(message, server, room)

    io.to(user.room).emit("serverMessage", {
      message: `${user.username} has left a chat`,
    })

    // sends users and room info after user left
    io.to(room).emit("roomUsers", {
      room: room,
      users: await getRoomUsers(room),
    })
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", apiRouter)

apiRouter.use("/auth", require("./routes/authRoutes"))
apiRouter.use("/chat", require("./routes/chatRoutes"))

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
