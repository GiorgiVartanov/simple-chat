import { Route, Routes } from "react-router-dom"

import LoginPage from "./pages/Login.page"
import MainPage from "./pages/Main.page"
import ProfilePage from "./pages/Profile.page"
import ChatRoomPage from "./pages/ChatRoom.page"
import PageNotFoundPage from "./pages/PageNotFound.page"

import Header from "./components/Header"
import RegisterPage from "./pages/Register.page"

function App() {
  return (
    <div className="app h-screen">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="login"
          element={<LoginPage />}
        />
        <Route
          path="register"
          element={<RegisterPage />}
        />
        <Route
          path="chat"
          element={<ChatRoomPage />}
        />
        <Route
          path="profile/:username"
          element={<ProfilePage />}
        />
        <Route
          path="*"
          element={<PageNotFoundPage />}
        />
      </Routes>
    </div>
  )
}

export default App
