const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        trim: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/mythinkacademy/image/upload/v1611323538/MyThinkacademy/admin_vosfvi.png"
    },
    role: {
        type: String
    },
    userId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)