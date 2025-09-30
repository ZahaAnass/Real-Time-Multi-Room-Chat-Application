const mongoose = require("mongoose")
const date = new Date()

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
        maxlength: [200, "Name cannot be more than 200 characters"],
        minlength: [1, "Name must be at least 1 characters"],
    },
    isDeletedMessage: {
        type: Boolean,
        default: false,
    },
    isModifiedMessage: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Message", MessageSchema)
