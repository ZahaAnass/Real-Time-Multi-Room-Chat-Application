const User = require("../models/User")
const Room = require("../models/Room")
const { StatusCodes } = require("http-status-codes")

const createRoom = async (req, res) => {
    const { name, description, category } = req.body
    if (!name || !description || !category) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide name, description and category" })
    }

    const adminId = req.user.userId
    if (!adminId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are not authorized to create a room" })
    }

    const user = await User.findById(adminId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    const members = [user._id]
    const requests = []
    
    try {
        const room = await Room.create({ name, description, category, adminId, members, requests })
        res.status(StatusCodes.CREATED).json({ room })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not created", error })
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

    if (room.adminId != req.user.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are not authorized to delete a room" })
    }

    try {
        await room.deleteOne()
        res.status(StatusCodes.OK).json({ msg: "Room deleted" })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not deleted" })
    }
}

const getJoinRequests = async (req, res) => {
    const roomId = req.params.roomId;

    if (!roomId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide roomId" })
    }

    const adminId = req.user.userId;

    const room = await Room.findOne({ _id: roomId })

    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }

    if (room.adminId != adminId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are not authorized to get join requests" })
    }

    if (!room?.requests?.length) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No join requests found" })
    }

    res.status(StatusCodes.OK).json({ requests : room.requests })
}

const approveJoinRequest = async (req, res) => {
    const { roomId, userId } = req.params
    const room = await Room.findById(roomId)

    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    if (room.adminId != req.user.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are not authorized to approve join requests" })
    }

    if (!room.requests.includes(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User is not in the requests list" })
    }

    if (room.members.includes(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User is already in the members list" })
    }

    room.requests = room.requests.filter((request) => request != userId)
    room.members.push(userId)

    try{
        await room.save()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not updated" })
    }

    res.status(StatusCodes.OK).json({ msg: "User approved" })
}

const rejectJoinRequest = async (req, res) => {
    const { roomId, userId } = req.params
    const room = await Room.findById(roomId)

    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    if (room.adminId != req.user.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are not authorized to reject join requests" })
    }

    if (!room.requests.includes(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User is not in the requests list" })
    }

    room.requests = room.requests.filter((request) => request != userId)

    try{
        await room.save()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not updated" })
    }
    res.status(StatusCodes.OK).json({ msg: "User rejected successfully" })
}
// ! TO TEST
const removeMember = async (req, res) => {
    const { roomId, userId } = req.params
    const room = await Room.findById(roomId)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    if (room.adminId !== req.user.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are not authorized to remove members" })
    }

    if (!room.members.includes(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User is not in the members list" })
    }

    room.members = room.members.filter((member) => member !== userId)

    try{
        await room.save()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not updated" })
    }
    res.status(StatusCodes.OK).json({ room })
}

const getRoomsByCategory = async (req, res) => {
    const { category } = req.params
    if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide category" })
    }

    const rooms = await Room.find({ category: category.trim().toLowerCase() })
    if (!rooms) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No rooms found" })
    }else{
        res.status(StatusCodes.OK).json({ rooms })
    }
}

const searchRoom = async (req, res) => {
    const { name } = req.query
    if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide name" })
    }

    const room = await Room.findOne({ name: name.trim().toLowerCase() })
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }else{
        res.status(StatusCodes.OK).json({ room })
    }
}

const updateRoomInfo = async (req, res) => {
    const { name, description, category } = req.body
    const { id } = req.params

    if (!name || !description || !category) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide name, description and category" })
    }

    const room = await Room.findById(id)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }else{
        room.name = name.trim().toLowerCase()
        room.description = description.trim().toLowerCase()
        room.category = category.trim().toLowerCase()
        room.updatedAt = new Date()
        try{
            await room.save()
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Room not updated" })
        }
        res.status(StatusCodes.OK).json({ room })
    }
}

module.exports = {
    createRoom,
    getRooms,
    deleteRoom,
    approveJoinRequest,
    rejectJoinRequest,
    removeMember,
    updateRoomInfo,
    searchRoom,
    getRoomsByCategory,
    getJoinRequests,
}