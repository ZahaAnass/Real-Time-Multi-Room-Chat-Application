const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        trim: true,
        maxlength: [100, "Name cannot be more than 100 characters"],
        minlength: [3, "Name must be at least 3 characters"],
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user id"],
    },
    category: {
        type: String,
        required: [true, "Please provide category"],
        trim: true,
        minlength: [3, "Category must be at least 3 characters"],
        maxlength: [100, "Category cannot be more than 100 characters"],
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide user id"],
        }
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide user id"],
        }
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = mongoose.model("Room", RoomSchema)
