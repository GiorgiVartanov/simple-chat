const express = require("express")
const router = express.Router()

const { startGame } = require("../controllers/chatController")

const { protect } = require("../middleware/authMiddleware")

router.post("/start", protect, startGame)

module.exports = router
