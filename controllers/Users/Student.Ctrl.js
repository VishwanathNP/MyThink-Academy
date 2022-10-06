const Students = require('../../models/Users/Student.Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const EnrollChapter = require('../../models/Enroll/EnrollChapter.Model')
const EnrollTopic = require('../../models/Enroll/EmrollTopic.Model')

const { CLIENT_URL } = process.env

const studentCtrl = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            const student = await Students.findOne({username: username.toLowerCase()})
            if(!student) return res.status(400).json({msg: "This username does not exist."})

            const isMatch = await bcrypt.compare(password, student.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({ id: student._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/student/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, student) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({ id: student.id })
                res.json({access_token})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const student = await Students.findById(req.user.id).select('-password')

            res.json(student)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/student/refresh_token'})

            return res.json({msg: "Logged out."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getEnrollChapters: async (req, res) => {
        try {

            const enrollChapter = await EnrollChapter.find({student: req.user.id}).populate('grade').populate('student').populate('chapter')
            
            res.json(enrollChapter)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getEnrollTopics: async (req, res) => {
        try {

            const enrollTopic = await EnrollTopic.find({student: req.user.id}).populate('grade').populate('student').populate('chapter').populate('topic')
            
            res.json(enrollTopic)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}


module.exports = studentCtrl