const Users = require('../../models/Users/Users.Model')
const Parents = require('../../models/Users/Parent.Model')
const Students = require('../../models/Users/Student.Model')
const Chapters = require('../../models/Course/Chapter.Model')
const Topics = require('../../models/Course/Topic.Model')
const EnrollChapter = require('../../models/Enroll/EnrollChapter.Model')
const EnrollTopic = require('../../models/Enroll/EmrollTopic.Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSendEmail = require('../../middleware/UserSendMail')

const { CLIENT_URL } = process.env

const parentCtrl = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, phone, password } = req.body
            
            if(!firstName || !lastName || !email || !phone || !password)
                return res.status(400).json({msg: "Please fill in all fields."})
            
            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid Email."})
            
            const parent = await Parents.findOne({email: email.toLowerCase()})
            if(parent) return res.status(400).json({msg: "This Email already exists."})

            if(!validatePhone(phone))
                return res.status(400).json({msg: "Invalid phone number."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            if(!checkPassword(password))
                return res.status(400).json({msg: "Password must contain one or more alphanumeric characters."})

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newParent = {
                firstName, lastName, email, phone, password: passwordHash
            }

            const activation_token = createActivationToken(newParent)

            const url = `${CLIENT_URL}/parent/activate/${activation_token}`

            userSendEmail(email, firstName, url, "Verify your email address")

            res.json({msg: "Register Success! Please activate your account to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const parent = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { firstName, lastName, email, phone, password } = parent

            const check = await Parents.findOne({email: email.toLowerCase()})
            if(check) return res.status(400).json({msg: "This email already exists."})

            const newUser = new Users({
                firstName, lastName
            })

            await newUser.save()

            const newParent = new Parents({
                firstName, lastName, email: email.toLowerCase(), phone, password
            })

            await newParent.save()

            newUser.userId = newParent._id
            newUser.role = "Parent"

            newParent.user = newUser

            await newUser.save()
            await newParent.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const parent = await Parents.findOne({email: email.toLowerCase()})
            if(!parent) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, parent.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({ id: parent._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/parent/refresh_token',
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

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, parent) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({ id: parent.id })
                res.json({access_token})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const parent = await Parents.findOne({email: email.toLowerCase()})
            if(!parent) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: parent._id})
            const url = `${CLIENT_URL}/parent/reset/${access_token}`

            sendMail(email, parent.firstName, url, "Reset your password")

            res.json({msg: "Re-send the password, please check your email."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            if(!checkPassword(password))
                return res.status(400).json({msg: "Password must contain one or more alphanumeric characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            await Parents.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const parent = await Parents.findById(req.user.id).select('-password')

            res.json(parent)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/parent/refresh_token'})

            return res.json({msg: "Logged out."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { firstName, lastName, avatar, phone } = req.body

            const parent = await Parents.findById({_id: req.user.id})

            await Parents.findOneAndUpdate({_id: req.user.id}, {
                firstName, lastName, avatar, phone
            })

            await Users.findOneAndUpdate({userId: parent._id}, {
                firstName, lastName, avatar
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addChild: async (req, res) => {
        try {
            const { firstName, lastName, username, birthday, grade, password } = req.body
            
            if(!firstName || !lastName || !username || !birthday || !grade || !password )
                return res.status(400).json({msg: "Please fill in all fields."})

            const student = await Students.findOne({username: username.toLowerCase()})
            if(student) return res.status(400).json({msg: "This Username already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            if(!checkPassword(password))
                return res.status(400).json({msg: "Password must contain one or more alphanumeric characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                firstName, lastName
            })

            await newUser.save()

            const newStudent = new Students({
                firstName, lastName, username: username.toLowerCase(), birthday, grade, password: passwordHash
            })

            const parent = await Parents.findById({_id: req.user.id})
            newStudent.parent = parent

            await newStudent.save().then(student => {
                parent.students.push(newStudent)
                parent.save()
            })

            newUser.userId = newStudent._id
            newUser.role = "Student"

            newStudent.user = newUser

            const chapter = await Chapters.find({grade: grade})
            chapter.forEach(async chap => {
                const topic = await Topics.find({chapter: chap._id})
                topic.forEach(async top => {
                    const newTopicEnrol = new EnrollTopic({
                        student: newStudent, grade: grade, chapters: top.chapter, topic: top._id
                    })
                    await newTopicEnrol.save()
                })

                const newEnroll = new EnrollChapter({
                    student: newStudent, grade: grade, chapter: chap._id
                })
                await newEnroll.save()
            })
            await newUser.save()
            await newStudent.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getStudentInfor: async (req, res) => {
        try {
            const std = await Students.find({parent: req.user.id}).populate('grade')

            res.json(std)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getStudent: async (req, res) => {
        try {
            const std = await Students.findOne({_id: req.params.sid}).populate('grade')

            res.json(std)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkPassword(str) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/;
    return re.test(str);
}

function validatePhone(str) {
    var re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return re.test(str);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = parentCtrl