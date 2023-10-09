import { NavLink } from "react-router-dom"

import { useAuthStore } from "../store/authStore"

const Header = () => {
  const [isLoggedIn, logoutUser, username] = useAuthStore((state) => [
    state.isLoggedIn,
    state.logoutUser,
    state.username,
  ])

  return (
    <header className="p-2 flex flex-row justify-between max-w-5xl mx-auto">
      <NavLink to="/">
        <h1 className="text-xl">chat</h1>
      </NavLink>

      <nav className="grid place-content-center">
        <ul className="flex flex-row gap-2 m-0">
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to={`profile/${username}`}
                  className="hover:opacity-75 transition-all ease-in-out duration-200 px-4 py-1.5 bg-secondary block font-semibold"
                >
                  profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={logoutUser}
                  className="hover:opacity-75 transition-all ease-in-out duration-200 px-4 py-1.5 bg-secondary"
                >
                  log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="login"
                  className="hover:opacity-75 transition-all ease-in-out duration-200 px-4 py-1.5 bg-secondary block font-semibold"
                >
                  log in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="register"
                  className="hover:opacity-75 transition-all ease-in-out duration-200 px-4 py-1.5 bg-secondary block font-semibold"
                >
                  register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
export default Header
