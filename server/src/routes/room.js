const express = require("express")
const router = express.Router()
const { createRoom, searchRoom, approveJoinRequest, rejectJoinRequest, removeMember, deleteRoom, getRooms, getRoomsByCategory, updateRoomInfo } = require("../controllers/room")

router.post("/create", createRoom)
router.post("/search", searchRoom)
router.post("/approve-join-request", approveJoinRequest)
router.post("/reject-join-request", rejectJoinRequest)
router.post("/remove-member", removeMember)
router.post("/delete", deleteRoom)
router.get("/get-rooms", getRooms)
router.get("/get-rooms-by-category", getRoomsByCategory)
router.post("/update-room-info", updateRoomInfo)

module.exports = router