import { toast } from "react-toastify"
import { useState } from "react"

import socket from "../socket"

import Chat from "../components/Chat"
import Page from "../components/Page"
import SelectChatRoom from "../components/SelectChatRoom"

const ChatRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState()

  const selectRoom = (room) => {
    setSelectedRoom(room)

    toast.success(`successfully joined ${room} room`)
    socket.emit("joinRoom", { room: room })
  }

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom")
    setSelectedRoom(null)
  }

  return (
    <Page>
      {selectedRoom ? (
        <Chat
          handleLeaveRoom={handleLeaveRoom}
          roomName={selectedRoom}
        />
      ) : (
        <SelectChatRoom selectRoom={selectRoom} />
      )}
    </Page>
  )
}
export default ChatRoomPage
