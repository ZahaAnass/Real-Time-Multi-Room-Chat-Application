const express = require("express")
const router = express.Router()
const { getUserInfo, leaveRoom, sendJoinRequest, updateUserInfo } = require("../controllers/user")

router.route("/").get(getUserInfo).post(updateUserInfo)
router.post("/leave-room", leaveRoom)
router.post("/send-join-request", sendJoinRequest)

module.exports = router