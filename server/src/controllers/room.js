const Room = require("../models/Room")
const { StatusCodes } = require("http-status-codes")

const createRoom = async (req, res) => {
    const room = await Room.create(req.body)
    res.status(StatusCodes.CREATED).json({ room })
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

const deleteRoom = async (req, res) => {
    const room = await Room.findById(req.params.id)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }
    await room.remove()
    res.status(StatusCodes.OK).json({ msg: "Room deleted" })
}

const getRooms = async (req, res) => {
    const rooms = await Room.find()
    res.status(StatusCodes.OK).json({ rooms })
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
    searchRoom,
    approveJoinRequest,
    rejectJoinRequest,
    removeMember,
    deleteRoom,
    getRooms,
    getRoomsByCategory,
    updateRoomInfo,
}