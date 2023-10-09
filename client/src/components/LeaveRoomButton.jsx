const LeaveRoomButton = ({ handleLeaveRoom, className }) => {
  return (
    <button
      onClick={handleLeaveRoom}
      className={`px-2.5 py-1 bg-red-500 font-semibold hover:opacity-75 duration-200 ease-in-out transition-all ${className}`}
    >
      Leave
    </button>
  )
}
export default LeaveRoomButton
