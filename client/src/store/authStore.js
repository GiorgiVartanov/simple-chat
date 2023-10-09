import { create } from "zustand"

import { loginUser, registerUser } from "../service/auth"

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  _id: localStorage.getItem("_id") || null,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  loginError: { email: [], password: [] },
  registerError: { username: [], email: [], password: [], confirmPassword: [] },
  wasUserRegistered: false,
  tokenExpirationDate: Number(localStorage.getItem("tokenExpirationDate")) || 0,

  loginUser: async (credentials) => {
    try {
      // if login was successful

      const response = await loginUser(credentials)
      const data = response.data

      const token = data.token // getting newly created token
      const username = data.user.username // getting username of logged in user
      const _id = data.user._id
      const accountType = data.user.accountType

      const date = new Date()
      const tokenExpirationDate = Number(
        new Date(date.getTime() + 24 * 60 * 60 * 1000)
      )

      // saving data to localstorage
      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("_id", _id)
      localStorage.setItem("accountType", accountType)
      localStorage.setItem(
        "tokenExpirationDate",
        tokenExpirationDate.toString()
      )

      // changing zustand's states
      return set(() => ({
        token: token,
        username: username,
        _id: _id,
        isLoggedIn: true,
        accountType: accountType,
        tokenExpirationDate: tokenExpirationDate,
      }))
    } catch (error) {
      // if login was unsuccessful

      // localStorage.removeItem("token")
      // localStorage.removeItem("username")

      return set(() => ({
        // token: null,
        // username: null,
        // isLoggedIn: false,
        loginError: {
          email: ["Invalid credentials"],
          password: ["Invalid credentials"],
        },
      }))
    }
  },
  registerUser: async (credentials) => {
    try {
      // if registration was successful

      const response = await registerUser(credentials)
      const data = response.data

      // user is automatically logged in after registration
      const token = data.token // getting newly created token
      const username = data.user.username // getting username of logged in user
      const _id = data.user._id
      const accountType = data.user.accountType

      const date = new Date()
      const tokenExpirationDate = Number(
        new Date(date.getTime() + 24 * 60 * 60 * 1000)
      )

      // saving data to localstorage
      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("_id", _id)
      localStorage.setItem("accountType", accountType)
      localStorage.setItem(
        "tokenExpirationDate",
        tokenExpirationDate.toString()
      )

      return set(() => ({
        token: token,
        username: username,
        _id: _id,
        isLoggedIn: true,
        accountType: accountType,
        tokenExpirationDate: tokenExpirationDate,
        registerError: {
          username: [],
          email: [],
          password: [],
          confirmPassword: [],
        },
        loginError: {
          email: [],
          password: [],
        },
      }))
    } catch (error) {
      // if registration was unsuccessful

      // change it later

      if (
        error.response.data.message === "User with this username already exists"
      ) {
        return set(() => ({
          registerError: {
            username: ["User with this username already exists"],
            email: [],
            password: [],
            confirmPassword: [],
          },
        }))
      }

      if (
        error.response.data.message === "User with this email already exists"
      ) {
        return set(() => ({
          registerError: {
            username: [],
            email: ["User with this email already exists"],
            password: [],
            confirmPassword: [],
          },
        }))
      }
    }
  },
  logoutUser: () => {
    // resets values and removes token from localstorage

    localStorage.removeItem("token")
    localStorage.removeItem("_id")
    localStorage.removeItem("username")
    localStorage.removeItem("accountType")

    return set(() => ({
      token: null,
      username: null,
      _id: null,
      accountType: null,
      isLoggedIn: false,
      wasPasswordSuccessfullyChanged: null,
      changePasswordError: {
        password: [],
        newPassword: [],
      },
    }))
  },
  hasSessionExpired: () => {
    const isLoggedIn = get().isLoggedIn

    if (!isLoggedIn) return

    const currentDate = Number(new Date())
    const tokenExpirationDate = get().tokenExpirationDate
    const logoutUser = get().logoutUser

    if (currentDate >= tokenExpirationDate) {
      logoutUser()
      console.log("your session token has expired")
    }
  },
}))
