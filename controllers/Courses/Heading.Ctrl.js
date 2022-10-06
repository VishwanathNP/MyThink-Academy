const Headings = require('../../models/Course/Heading.Model')
const Chapters = require('../../models/Course/Chapter.Model')

const headingCtrl = {
    getHeadings: async(req, res) => {
        try {
            const heading = await Headings.find()
            res.json(heading)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createHeadings: async(req, res) => {
        try {
            const { heading, description, image } = req.body

            const newHeading = new Headings({
                heading: heading.toLowerCase(), description: description.toLowerCase(), image
            })
            await newHeading.save()
            
            res.json({msg: "Created a heading."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteHeadings: async(req, res) => {
        try {
            const chapter = await Chapters.findOne({heading: req.params.hid})
            if(chapter) return res.status(400).json({
                msg: "Please delete all the chapter with a relationship."
            })

            await Headings.findByIdAndDelete(req.params.hid)
            res.json({msg: "Deleted a heading"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateHeadings: async(req, res) => {
        try {
            const { heading, description } = req.body

            await Headings.findByIdAndUpdate({_id: req.params.hid}, {
                heading: heading.toLowerCase(), description: description.toLowerCase()
            })

            res.json({msg: "Update a heading"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = headingCtrl