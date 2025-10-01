const User = require("../models/User")
const Room = require("../models/Room")
const { StatusCodes } = require("http-status-codes")

const createRoom = async (req, res) => {
    const { name, description, category } = req.body
    if (!name || !description || !category) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide name, description and category" })
    }

    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    const adminId = user._id
    const members = [user._id]
    const requests = []
    
    try {
        const room = await Room.create({ name, description, category, adminId, members, requests })
        res.status(StatusCodes.CREATED).json({ room })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not created" })
    }
}

const getRooms = async (req, res) => {
    const rooms = await Room.find()
    res.status(StatusCodes.OK).json({ rooms })
}

const deleteRoom = async (req, res) => {
    const { id } = req.params
    const room = await Room.findById(id)

    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }
    
    try {
        await room.deleteOne()
        res.status(StatusCodes.OK).json({ msg: "Room deleted" })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not deleted" })
    }
}

const searchRoom = async (req, res) => {
    const room = await Room.findOne({ name: req.query.name })
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }
    res.status(StatusCodes.OK).json({ room })
}

const approveJoinRequest = async (req, res) => {
    const room = await Room.findById(req.params.id)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }
    room.requests = room.requests.filter((request) => request !== req.user.userId)
    room.members.push(req.user.userId)
    await room.save()
    res.status(StatusCodes.OK).json({ room })
}

const rejectJoinRequest = async (req, res) => {
    const room = await Room.findById(req.params.id)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }
    room.requests = room.requests.filter((request) => request !== req.user.userId)
    await room.save()
    res.status(StatusCodes.OK).json({ room })
}

const removeMember = async (req, res) => {
    const room = await Room.findById(req.params.id)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }
    room.members = room.members.filter((member) => member !== req.user.userId)
    await room.save()
    res.status(StatusCodes.OK).json({ room })
}

const getRoomsByCategory = async (req, res) => {
    const rooms = await Room.find({ category: req.params.category })
    res.status(StatusCodes.OK).json({ rooms })
}

const updateRoomInfo = async (req, res) => {
    const room = await Room.findById(req.params.id)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }
    room.name = req.body.name
    room.description = req.body.description
    room.category = req.body.category
    await room.save()
    res.status(StatusCodes.OK).json({ room })
}

module.exports = {
    createRoom,
    getRooms,
    searchRoom,
    deleteRoom,
    approveJoinRequest,
    rejectJoinRequest,
    removeMember,
    getRoomsByCategory,
    updateRoomInfo,
}