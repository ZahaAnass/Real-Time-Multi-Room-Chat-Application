const express = require("express")
const router = express.Router()
const { createRoom, searchRoom, approveJoinRequest, rejectJoinRequest, removeMember, deleteRoom, getRooms, getRoomsByCategory, updateRoomInfo } = require("../controllers/room")

router.route("/").post(createRoom).get(getRooms)
router.delete("/:id", deleteRoom)
router.post("/search", searchRoom)
router.post("/approve-join-request", approveJoinRequest)
router.post("/reject-join-request", rejectJoinRequest)
router.post("/remove-member", removeMember)
router.get("/get-rooms-by-category", getRoomsByCategory)
router.post("/update-room-info", updateRoomInfo)

module.exports = router