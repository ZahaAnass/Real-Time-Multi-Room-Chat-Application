const express = require("express")
const router = express.Router()
const { sendMessage, editMessage, deleteMessage } = require("../controllers/message")

router.post("/send", sendMessage)
router.post("/edit", editMessage)
router.post("/delete", deleteMessage)

module.exports = router