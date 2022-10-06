const mongoose = require('mongoose')

const enrollTopicSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grades"
    },
    chapters: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapters"
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topics"
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

module.exports = mongoose.model("EnrollTopic", enrollTopicSchema)