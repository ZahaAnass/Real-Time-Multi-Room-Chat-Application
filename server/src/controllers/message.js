const Message = require("../models/Message")
const { StatusCodes } = require("http-status-codes")

const sendMessage = async (req, res) => {
    const message = await Message.create(req.body)
    res.status(StatusCodes.CREATED).json({ message })
}

const editMessage = async (req, res) => {
    const message = await Message.findById(req.params.id)
    if (!message) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Message not found" })
    }
    message.content = req.body.content
    await message.save()
    res.status(StatusCodes.OK).json({ message })
}

const deleteMessage = async (req, res) => {
    const message = await Message.findById(req.params.id)
    if (!message) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Message not found" })
    }
    await message.remove()
    res.status(StatusCodes.OK).json({ msg: "Message deleted" })
}

module.exports = {
    sendMessage,
    editMessage,
    deleteMessage,
}