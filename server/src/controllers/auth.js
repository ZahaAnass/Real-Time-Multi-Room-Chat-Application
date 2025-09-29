const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const register = async (req, res) => {
    const { username, email, passwordHash } = req.body
    
    if (!username || !email || !passwordHash) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide username, email and password" })
    }

    const user = await User.create({ username, email, passwordHash })
    return res.status(StatusCodes.CREATED).json({ user: {
        username,
        email,
        createdAt: user.createdAt,
    }} )
}

const login = async (req, res) => {
    const { email, passwordHash } = req.body
    
    if (!email || !passwordHash) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide email and password" })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" })
    }

    const isMatch = await user.comparePassword(passwordHash)
    if (!isMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" })
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
    }, token })
}

module.exports = {
    register,
    login,
}
