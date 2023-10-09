const mongoose = require("mongoose")

const gameSchema = mongoose.Schema(
  {
    player1: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    player2: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    selectedText: {
      // text that player1 and player2 are competing in
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Text",
    },
    player1progress: {
      // progress of player 1 (amount of types letters)
      type: Number,
      default: 0,
    },
    player2progress: {
      // progress of player 2 (amount of types letters)
      type: Number,
      default: 0,
    },
    gameStatus: {
      type: String,
      enum: ["Waiting", "InProgress", "Finished"],
      default: "Waiting",
    },
    gameType: { type: String, enum: ["Ranked", "Casual"], required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Game", gameSchema)
