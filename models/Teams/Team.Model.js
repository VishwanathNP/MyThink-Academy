const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/mythinkacademy/image/upload/v1612010535/MyThinkacademy/teams_twsuqi.png"
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grades"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teachers"
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Teams", teamSchema)