import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import socket from "../socket"
import { useAuthStore } from "../store/authStore"

import Messages from "./Messages"
import ChatMemberList from "./ChatMemberList"
import LeaveRoomButton from "./LeaveRoomButton"

const Chat = ({ handleLeaveRoom, roomName }) => {
  const [username] = useAuthStore((state) => [state.username])

  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [chatMembers, setChatMembers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message.trim().length === 0) {
      toast.error("can't send empty message")
      return
    }

    setChatMessages((prevState) => [
      ...prevState,
      { user: username, text: message, _id: new Date() },
    ])
    socket.emit("chatMessage", { message: message, room: roomName })

    setMessage("")
  }

  const handleTextChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    socket.on("message", ({ user, text, _id }) => {
      setChatMessages((prevState) => [
        ...prevState,
        { user: user, text: text, _id: _id },
      ])
    })

    socket.on("roomUsers", (data) => {
      const roomMembers = data.users

      setChatMembers(roomMembers)
    })

    socket.on("joinData", ({ messages, roomUsers }) => {
      setChatMessages(messages)
      setChatMembers(roomUsers)
    })

    // socket.on("serverMessage", ({ message }) => {
    //   setChatMessages((prevState) => [
    //     ...prevState,
    //     { text: message, user: "server", _id: new Date() },
    //   ])
    // })

    return () => {
      // removing event listeners

      socket.off("message")
      socket.off("roomUsers")
      socket.off("joinData")
      socket.off("serverMessage")
    }
  }, [socket])

  return (
    <div className="m-auto w-full max-w-lg">
      <h2 className="mb-2 text-xl text-center">
        <span className="opacity-25">room </span>
        {roomName}
        <LeaveRoomButton
          handleLeaveRoom={handleLeaveRoom}
          className="ml-4"
        />
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-40"
      >
        <input
          onChange={handleTextChange}
          value={message}
          placeholder="message"
          type="text"
          className="p-3 text-center"
        />
        <button className="bg-main p-2 hover:opacity-90 transition-all ease-in-out duration-200">
          send a message
        </button>
      </form>
      <div>
        <Messages messages={chatMessages} />
        <ChatMemberList members={chatMembers} />
      </div>
    </div>
  )
}

export default Chat
