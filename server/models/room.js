const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  type: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  //   password: {
  //     type: String
  //   }
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
