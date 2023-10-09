import ajax from "./ajax"

export const loginUser = (credentials) => ajax.post("/auth/login", credentials) // logs in user with the passed data

export const registerUser = (credentials) =>
  ajax.post("/auth/register", credentials) // registers user with the passed data
