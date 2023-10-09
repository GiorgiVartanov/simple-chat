import axios from "axios"

// instance of axios with custom configurations
const ajax = axios.create({
  baseURL: "/api", // all requests will be made to this URL
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

ajax.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default ajax
