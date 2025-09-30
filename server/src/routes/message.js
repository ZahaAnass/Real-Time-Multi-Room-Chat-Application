const express = require("express")
const router = express.Router()
const { sendMessage, editMessage, deleteMessage } = require("../controllers/message")

router.post("/send", sendMessage)
router.patch("/edit/:id", editMessage)
router.delete("/delete/:id", deleteMessage)

module.exports = router