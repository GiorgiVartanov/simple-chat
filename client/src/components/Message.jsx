const Message = ({ isAuthor, isServerMessage, username, message }) => {
  return (
    <li className={`flex gap-2 ${isAuthor ? " flex-row-reverse" : ""}`}>
      <div
        className={`py-1 px-2 rounded-sm whitespace-nowrap max-h-8 ${
          isAuthor ? " bg-main" : "bg-secondary"
        } ${isServerMessage ? "hidden" : ""}`}
      >
        {username}
      </div>
      <div
        className={`py-1 px-2 rounded-sm w-full bg-opacity-20 ${
          isServerMessage
            ? "bg-main text-center font-bold bg-opacity-60"
            : isAuthor
            ? "bg-main"
            : "bg-secondary"
        }`}
      >
        {message}
      </div>
    </li>
  )
}
export default Message
