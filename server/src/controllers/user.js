const User = require("../models/User")
const Room = require("../models/Room")
const { StatusCodes } = require("http-status-codes")

const getUserInfo = async (req, res) => {
    const id = req.user.userId

    const user = await User.findById(id)

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    res.status(StatusCodes.OK).json({ user: { _id: user._id, username: user.username, email: user.email } })
}

const updateUserInfo = async (req, res) => {
    const { username, email } = req.body
    if (!username || !email || username.trim().length < 3 || email.trim().length < 3 ) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide username and email" })
    }

    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    if(user.email != email){
        const checkEmail = await User.findOne({ email: email.trim().toLowerCase() })
        if (checkEmail) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already exists" })
        }else{
            if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide valid email" })
            }else{
                user.email = email.trim().toLowerCase()
            }
        }
    }

    if(user.username != username){
        const checkUsername = await User.findOne({ username: username.trim().toLowerCase() })
        if (checkUsername) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already exists" })
        }else{
            if(username.trim().length < 3){
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Username must be at least 3 characters" })
            }else{
                user.username = username.trim().toLowerCase()
            }
        }
    }

    user.updatedAt = new Date()

    try{
        await user.save()
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to update user" })
    }

    res.status(StatusCodes.OK).json({ user })
}

const updatePassword = async (req, res) => {
    const { lastPassword, newPassword } = req.body
    const user = await User.findById(req.user.userId)

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    if (!lastPassword || !newPassword || lastPassword.trim().length < 8 || newPassword.trim().length < 8 ) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide password with at least 8 characters" })
    }

    if(!await user.comparePassword(lastPassword)){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "The Last Password is incorrect" })
    }

    user.passwordHash = newPassword.trim()
    user.updatedAt = new Date()

    try{
        await user.save()
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to update password" })
    }

    res.status(StatusCodes.OK).json({ user })
}

const sendJoinRequest = async (req, res) => {
    const { roomId } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    const room = await Room.findById(roomId)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }

    if(room.members.includes(user._id)){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "You are already in this room" })
    }

    room.requests.push(user._id)

    try{
        await room.save()
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to send join request" })
    }

    res.status(StatusCodes.OK).json({ user })
}

const leaveRoom = async (req, res) => {
    const { roomId } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    const room = await Room.findById(roomId)
    if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Room not found" })
    }

    if(!room.members.includes(user._id)){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "You are not in this room" })
    }

    room.members.remove(user._id)

    try{
        await room.save()
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to leave room" })
    }

    res.status(StatusCodes.OK).json({ user })
}

module.exports = {
    getUserInfo,
    updatePassword,
    leaveRoom,
    sendJoinRequest,
    updateUserInfo,
}
