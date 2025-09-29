const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Authentication invalid" })
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: decoded.userId, username: decoded.username }
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Authentication invalid" })
    }
}

module.exports = authMiddleware;