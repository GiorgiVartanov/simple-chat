const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Check if user exists
  const userExistsByUsername = await User.findOne({ username })

  if (userExistsByUsername) {
    res.status(400)
    throw new Error("User with this username already exists")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    username: username,
    password: hashedPassword,
    accountType: "User",
  })

  if (user) {
    res.status(201).json({
      user: {
        _id: user.id,
        username: user.username,
        accountType: user.accountType,
      },
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const user = await User.findOne({ username: username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      user: {
        _id: user.id,
        username: user.username,
        accountType: user.accountType,
      },
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }) // it will expire in 1 day (24hours)
}

module.exports = { registerUser, loginUser }
