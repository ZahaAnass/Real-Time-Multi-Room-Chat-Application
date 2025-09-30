const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const getUserInfo = async (req, res) => {
    const user = await User.findById(req.user.userId)

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    res.status(StatusCodes.OK).json({ user })
}

const joinRoom = async (req, res) => {
    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }
    res.status(StatusCodes.OK).json({ user })
}

const leaveRoom = async (req, res) => {
    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }
    res.status(StatusCodes.OK).json({ user })
}

const sendJoinRequest = async (req, res) => {
    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }
    res.status(StatusCodes.OK).json({ user })
}

const updateUserInfo = async (req, res) => {
    const user = await User.findById(req.user.userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }
    res.status(StatusCodes.OK).json({ user })
}

module.exports = {
    getUserInfo,
    joinRoom,
    leaveRoom,
    sendJoinRequest,
    updateUserInfo,
}
