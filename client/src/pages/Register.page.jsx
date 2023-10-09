import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "../store/authStore"

import Page from "../components/Page"

const RegisterPage = () => {
  const navigate = useNavigate()

  const [isLoggedIn, registerUser] = useAuthStore((state) => [
    state.isLoggedIn,
    state.registerUser,
  ])

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, navigate])

  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleUsernameChange = (e) => {
    const username = e.target.value

    setCredentials((prevState) => ({
      username: username,
      password: prevState.password,
    }))
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value

    setCredentials((prevState) => ({
      username: prevState.username,
      password: password,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (credentials.username.length < 4) {
      console.log("username is too short")
      return
    }
    if (credentials.password.length < 4) {
      console.log("password is too short")
      return
    }

    registerUser(credentials)
  }

  return (
    <Page>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-40"
      >
        <h2 className="text-lg font-semibold">Register</h2>
        <input
          type="text"
          onChange={handleUsernameChange}
          className="p-2"
        />
        <input
          type="password"
          onChange={handlePasswordChange}
          className="p-2"
        />
        <button className="bg-main p-2 hover:opacity-90 transition-all ease-in-out duration-200">
          Register
        </button>
      </form>
    </Page>
  )
}
export default RegisterPage
