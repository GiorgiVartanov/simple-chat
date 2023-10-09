import { useAuthStore } from "../store/authStore"

import Message from "./Message"

const Messages = ({ messages }) => {
  const username = useAuthStore((state) => state.username)

  return (
    <ul className="max-w-lg mx-auto mt-4 flex flex-col gap-3">
      {messages.map(({ text, user, _id }) => (
        <Message
          key={_id}
          isAuthor={user === username}
          isServerMessage={user === "server"}
          username={user}
          message={text}
        />
      ))}
    </ul>
  )
}
export default Messages
