const Grades = require('../../models/Course/Grade.Model')
const Headings = require('../../models/Course/Heading.Model')

const gradeCtrl = {
    getGrade: async(req, res) => {
        try {
            const grade = await Grades.find()
            res.json(grade)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createGrade: async(req, res) => {
        try {
            const { name } = req.body
            const grade = await Grades.findOne({name})
            if(grade) return res.status(400).json({msg: "This grade already exists."})

            const newGrade = new Grades({name: name.toLowerCase()})

            await newGrade.save()

            res.json({msg: "Create a Grade"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteGrade: async(req, res) => {
        try {
            const heading = await Headings.findOne({grade: req.params.id})
            if(heading) return res.status(400).json({
                msg: "Please delete all the headings with a relationship."
            })

            await Grades.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Grade"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateGrade: async(req, res) => {
        try {
            const { name } = req.body
            await Grades.findOneAndUpdate({_id: req.params.id}, {name: name.toLowerCase()})

            res.json({msg: "Updated a Grade"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = gradeCtrl