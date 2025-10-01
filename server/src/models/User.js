const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const date = new Date()
const today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        trim: true,
        maxlength: [50, "Username cannot be more than 50 characters"],
        minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email"
        ],
        unique: true,
    },
    passwordHash: {
        type: String,
        required: [true, "Please provide password"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters"],
    }
}, {
    timestamps: true
})

UserSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('passwordHash')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.passwordHash)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)
