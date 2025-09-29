const mongoose = require("mongoose")
const date = new Date()
const today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

const MessageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Please provide room id"],
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user id"],
    },
    content: {
        type: String,
        required: [true, "Please provide name"],
        trim: true,
        maxlength: [100, "Name cannot be more than 100 characters"],
        minlength: [3, "Name must be at least 3 characters"],
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Message", MessageSchema)
