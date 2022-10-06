const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
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
    username: {
        type: String,
        required: [true, "Please enter your username!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    birthday: {
        type: Date,
        required: [true, "Please enter your birthday!"],
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grades"
    },
    role: {
        type: Number,
        default: 3 // 0 - parents, 1 - admin, 2 - student, 3 - teacher
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parents"
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams"
    },
    trail: {
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Students", studentSchema)