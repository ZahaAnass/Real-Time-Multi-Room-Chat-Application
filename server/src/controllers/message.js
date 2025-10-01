const Message = require("../models/Message")
const { StatusCodes } = require("http-status-codes")

const sendMessage = async (req, res) => {
    const { content, roomId, senderId } = req.body

    if (!content || !roomId || !senderId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide content, room id and sender id" })
    }

    const message = await Message.create({ content, roomId, senderId })

    if (!message) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Message not created" })
    }

    res.status(StatusCodes.CREATED).json({ message })
}

const editMessage = async (req, res) => {
    const { content } = req.body

    if (!content) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide content" })
    }

    const { id } = req.params

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide message id" })
    }

    const message = await Message.findById(id)

    if (!message) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Message not found" })
    }

    message.content = content
    message.isModifiedMessage = true
    message.updatedAt = new Date()

    try{
        await message.save()
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to edit message" })
    }

    res.status(StatusCodes.OK).json({ message })
}

const deleteMessage = async (req, res) => {
    const { id } = req.params
    const message = await Message.findById(id)

    if (!message) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Message not found" })
    }

    if (message.senderId.toString() !== req.user.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are not authorized to delete this message" })
    }

    if (message.isDeletedMessage) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Message already deleted" })
    }

    message.content = "This message has been deleted"
    message.isDeletedMessage = true

    try{
        await message.save()
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to delete message" })
    }

    res.status(StatusCodes.OK).json({ msg: "Message deleted" })
}

module.exports = {
    sendMessage,
    editMessage,
    deleteMessage,
}