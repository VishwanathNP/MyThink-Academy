const mongoose = require('mongoose')

const headingSchema = new mongoose.Schema({
    heading: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
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

module.exports = mongoose.model("Headings", headingSchema)