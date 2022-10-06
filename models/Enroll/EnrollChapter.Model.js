const mongoose = require('mongoose')

const enrollChapterSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grades"
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapters"
    },
    status: {
        type: Boolean,
        default: false
    },
    progress: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("EnrollChapter", enrollChapterSchema)