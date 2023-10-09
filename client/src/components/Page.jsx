const Page = ({ children, className }) => {
  return (
    <div className={`page max-w-xl mx-auto p-2 ${className}`}>{children}</div>
  )
}
export default Page
