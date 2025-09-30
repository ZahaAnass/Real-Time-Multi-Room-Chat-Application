const express = require("express")
const router = express.Router()
const { getUserInfo, joinRoom, leaveRoom, sendJoinRequest, updateUserInfo } = require("../controllers/user")

router.get("/", getUserInfo)
router.post("/join-room", joinRoom)
router.post("/leave-room", leaveRoom)
router.post("/send-join-request", sendJoinRequest)
router.post("/update-user-info", updateUserInfo)

module.exports = router