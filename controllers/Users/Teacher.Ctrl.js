const Users = require('../../models/Users/Users.Model')
const Teachers = require('../../models/Users/Teacher.Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const employeeSendMail = require('../../middleware/EmployeeSendMail')

const { CLIENT_URL } = process.env
const { ADMIN_EMAIL } = process.env

const teacherCtrl = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, phone, password } = req.body
            
            if(!firstName || !lastName || !email || !phone || !password)
                return res.status(400).json({msg: "Please fill in all fields."})
            
            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid Email."})
            
            const teacher = await Teachers.findOne({email: email.toLowerCase()})
            if(teacher) return res.status(400).json({msg: "This Email already exists."})

            if(!validatePhone(phone))
                return res.status(400).json({msg: "Invalid phone number."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            if(!checkPassword(password))
                return res.status(400).json({msg: "Password must contain one or more alphanumeric characters."})

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newTeacher = {
                firstName, lastName, email, phone, password: passwordHash
            }

            const activation_token = createActivationToken(newTeacher)

            const url = `${CLIENT_URL}/teacher/activate/${activation_token}`

            employeeSendMail(ADMIN_EMAIL, firstName, url, "Verify your email address")

            res.json({msg: "Register Success! Please activate your account to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const teacher = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { firstName, lastName, email, phone, password } = teacher

            const check = await Teachers.findOne({email: email.toLowerCase()})
            if(check) return res.status(400).json({msg: "This email already exists."})

            const newUser = new Users({
                firstName, lastName
            })

            await newUser.save()

            const newTeacher = new Teachers({
                firstName, lastName, email: email.toLowerCase(), phone, password
            })

            await newTeacher.save()

            newUser.userId = newTeacher._id
            newUser.role = "Teacher"

            newTeacher.user = newUser

            await newUser.save()
            await newTeacher.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const teacher = await Teachers.findOne({email: email.toLowerCase()})
            if(!teacher) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, teacher.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({ id: teacher._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/teacher/refresh_token',
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

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, teacher) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({ id: teacher.id })
                res.json({access_token})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const teacher = await Teachers.findOne({email: email.toLowerCase()})
            if(!teacher) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: teacher._id})
            const url = `${CLIENT_URL}/teacher/reset/${access_token}`

            employeeSendMail(email, teacher.firstName, url, "Reset your password")

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

            await Teachers.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const teacher = await Teachers.findById(req.user.id).select('-password')

            res.json(teacher)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/teacher/refresh_token'})

            return res.json({msg: "Logged out."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { firstName, lastName, avatar, phone } = req.body

            const teacher = await Teachers.findById({_id: req.user.id})

            await Teachers.findOneAndUpdate({_id: req.user.id}, {
                firstName, lastName, avatar, phone
            })

            await Users.findOneAndUpdate({userId: teacher._id}, {
                firstName, lastName, avatar
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
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


module.exports = teacherCtrl