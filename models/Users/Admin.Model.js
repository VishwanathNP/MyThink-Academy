 const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
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
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    role: {
        type: Number,
        default: 0 // 0 - admin, 1 - parent, 2 - teacher, 3 - student
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Admins", adminSchema)