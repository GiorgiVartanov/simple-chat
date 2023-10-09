import Page from "../components/Page"
import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <Page className="grid place-content-center">
      <Link
        to="/chat"
        className="bg-main px-3 py-1.5 rounded-md"
      >
        Go To Chat
      </Link>
    </Page>
  )
}
export default MainPage
