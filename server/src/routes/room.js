const express = require("express")
const router = express.Router()
const {
    createRoom, searchRoom, approveJoinRequest,
    rejectJoinRequest, removeMember, deleteRoom,
    getRooms, getRoomsByCategory, updateRoomInfo,
    getJoinRequests
} = require("../controllers/room")

router.route("/").post(createRoom).get(getRooms)
router.delete("/:id", deleteRoom)
router.post("/search", searchRoom)
router.get("/join-request/:roomId", getJoinRequests)
router.route("/join-request/:roomId/:userId").post(approveJoinRequest).delete(rejectJoinRequest)
router.post("/remove-member", removeMember)
router.get("/get-rooms-by-category", getRoomsByCategory)
router.post("/update-room-info", updateRoomInfo)

module.exports = router