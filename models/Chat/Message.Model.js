const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chatroom"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Messages", messageSchema)