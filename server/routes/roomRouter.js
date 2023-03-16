const express = require("express");
const { newRoom, getAllRooms } = require("../controllers/roomController");
const roomRouter = express.Router();

roomRouter.post("/", newRoom);
roomRouter.get("/", getAllRooms);

module.exports = roomRouter;
