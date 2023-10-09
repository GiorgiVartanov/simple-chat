import io from "socket.io-client"

import { useAuthStore } from "./store/authStore"

const token = useAuthStore.getState().token // getting token from store

// connecting to the backend and sending token
const socket = io("ws://localhost:5000", {
  auth: { token: token },
})

export default socket
