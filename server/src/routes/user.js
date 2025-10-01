const express = require("express")
const router = express.Router()
const { getUserInfo, leaveRoom, sendJoinRequest, updateUserInfo, updatePassword } = require("../controllers/user")

router.route("/").get(getUserInfo).post(updateUserInfo)
router.post("/leave-room", leaveRoom)
router.post("/send-join-request", sendJoinRequest)
router.post("/update-password", updatePassword)

module.exports = router