const mongoose = require("mongoose")

const textSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    amountOfLetters: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Text", textSchema)
