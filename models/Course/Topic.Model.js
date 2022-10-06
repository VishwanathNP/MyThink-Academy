const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapters"
    },
    topic: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
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

module.exports = mongoose.model("Topics", topicSchema)