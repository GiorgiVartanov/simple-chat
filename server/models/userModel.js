const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
