const ChatMemberList = ({ members }) => {
  return (
    <ul>
      {members.map((member, index) => (
        <li key={index}>{member.username}</li>
      ))}
    </ul>
  )
}
export default ChatMemberList
