const asyncHandler = require("express-async-handler")
const { Server } = require("socket.io")

const User = require("../models/userModel")
const Game = require("../models/gameModel")
const Text = require("../models/textModel")

const startGame = asyncHandler(async (req, res) => {
  const { enemyUsername } = req.params
  const user = await User.findById(req.user)
  const challengedUser = await User.findOne({ username: enemyUsername })
})

module.exports = { startGame }
