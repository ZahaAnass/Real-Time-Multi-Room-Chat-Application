const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const register = async (req, res) => {
    const { username, email, password } = req.body
    
    const checkEmail = await User.findOne({ email: email.trim().toLowerCase() })

    if (checkEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already exists" })
    }

    if (!username || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide username, email and password" })
    }

    if(password.length < 8){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password must be at least 8 characters" })
    }

    if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide valid email" })
    }

    const user = await User.create({ username, email, passwordHash: password })
    return res.status(StatusCodes.CREATED).json({ user: {
        username,
        email: email.trim().toLowerCase(),
        createdAt: user.createdAt,
    }} )
}

const login = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide email and password" })
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" })
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: {
        username: user.username,
        email: user.email.trim().toLowerCase(),
        createdAt: user.createdAt,
    }, token })
}

module.exports = {
    register,
    login,
}
