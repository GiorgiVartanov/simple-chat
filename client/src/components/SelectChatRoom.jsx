import { useState } from "react"

const SelectChatRoom = ({ selectRoom }) => {
  const [roomName, setRoomName] = useState("")

  const handleChangeLobbyName = (e) => {
    setRoomName(e.target.value.trim())
  }

  const handleSelectRoom = () => {
    selectRoom(roomName)
  }

  return (
    <div className="m-auto w-full max-w-lg mt-40 flex flex-col gap-2">
      <input
        type="text"
        placeholder="room name"
        onChange={handleChangeLobbyName}
        value={roomName}
        className="p-3 text-center"
      />
      <button
        onClick={handleSelectRoom}
        className="bg-main p-2 hover:opacity-90 transition-all ease-in-out duration-200"
      >
        join
      </button>
    </div>
  )
}
export default SelectChatRoom
