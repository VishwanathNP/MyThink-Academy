const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grades"
    },
    heading: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Headings"
    },
    chapter: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    topic: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topics"
    }],
    image: [{
        name: {
            type: String
        },
        url: {
            type: String
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Chapters", chapterSchema)