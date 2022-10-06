const Teams = require('../../models/Teams/Team.Model')
const Teachers = require('../../models/Users/Teacher.Model')
const Students = require('../../models/Users/Student.Model')

const teamsCtrl = {
    getTeams: async(req, res) => {
        try {
            const teams = await Teams.find().populate('grade').populate('teacher').populate('students')
            res.json(teams)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTeams: async(req, res) => {
        try {
            const { name, avatar, grade_id, teacher, students_list } = req.body
            if(!avatar) return res.status(400).json({msg: "No image upload"})

            const team = await Teams.findOne({name: name})
            if(team) return res.status(400).json({msg: "Team already exists."})

            const teach = await Teachers.findById(teacher)
            if(!teach) return res.status(400).json({msg: "Teacher doesn't exists."})

            for(let i = 0; i < students_list.length; i++){
                const std = await Students.findById(students_list[i])
                if(std.team !== undefined) {
                    return res.status(400).json({msg: `${std.firstName} is already assigned to a team`})
                }
            }

            const newTeam = new Teams({
                name, avatar, grade_id, teacher: teach, students: students_list
            })

            
            await newTeam.save().then(cat => {
                teach.teams.push(newTeam)
                teach.save()
                students_list.forEach(async std => {
                    const student = await Students.findByIdAndUpdate(std, {team: newTeam})
                    student.save()
                })
            })

            res.json({msg: "Created a Team."})

            

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTeams: async(req, res) => {
        try {

            const team = await Teams.findById(req.params.id)

            team.students.forEach(async std => {
                const student = await Students.findByIdAndUpdate(std, {team: undefined})
                student.save()
            })

            await Teachers.findByIdAndUpdate(team.teacher, {$pull: {"teams": req.params.id}})

            await Teams.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a team"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTeams: async(req, res) => {
        try {
            const { name, avatar } = req.body

            await Teams.findByIdAndUpdate({_id: req.params.id}, {
                name, avatar
            })

            res.json({msg: "Update a Team"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = teamsCtrl