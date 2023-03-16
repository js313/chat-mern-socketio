const CustomError = require("../CustomError/CustomError");
const Room = require("../models/room");

exports.newRoom = async (req, res, next) => {
  const { name } = req.body;
  try {
    const room = new Room({ name });
    await room.save();
    res.status(201).json({ message: "room created" });
  } catch (err) {
    next(err);
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ isVisible: true });
    res.status(201).json({ data: rooms, page: 1, limit: 10 });
  } catch (err) {
    next(err);
  }
};
