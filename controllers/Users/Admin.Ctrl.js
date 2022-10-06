const Users = require('../../models/Users/Users.Model')
const Admins = require('../../models/Users/Admin.Model')
const Parents = require('../../models/Users/Parent.Model')
const Teachers = require('../../models/Users/Teacher.Model')
const Students = require('../../models/Users/Student.Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const employeeSendMail = require('../../middleware/EmployeeSendMail')

const { CLIENT_URL } = process.env
const { ADMIN_EMAIL } = process.env

class APIParentFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryOdj = {...this.queryString} //queryString = req.query
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryOdj[el]))

        let queryStr = JSON.stringify(queryOdj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit *1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

class APITeacherFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryOdj = {...this.queryString} //queryString = req.query
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryOdj[el]))

        let queryStr = JSON.stringify(queryOdj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit *1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

class APIStudentFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryOdj = {...this.queryString} //queryString = req.query
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryOdj[el]))

        let queryStr = JSON.stringify(queryOdj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit *1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const adminCtrl = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body
            
            if(!firstName || !lastName || !email || !password)
                return res.status(400).json({msg: "Please fill in all fields."})
            
            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid Email."})
            
            const admin = await Admins.findOne({email: email.toLowerCase()})
            if(admin) return res.status(400).json({msg: "This Email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            if(!checkPassword(password))
                return res.status(400).json({msg: "Password must contain one or more alphanumeric characters."})

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newAdmin = {
                firstName, lastName, email, password: passwordHash
            }

            const activation_token = createActivationToken(newAdmin)

            const url = `${CLIENT_URL}/admin/activate/${activation_token}`

            employeeSendMail(ADMIN_EMAIL, firstName, url, "Verify your email address")

            res.json({msg: "Register Success! Please activate your account to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const admin = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { firstName, lastName, email, password } = admin

            const check = await Admins.findOne({email: email.toLowerCase()})
            if(check) return res.status(400).json({msg: "This email already exists."})

            const newUser = new Users({
                firstName, lastName
            })

            await newUser.save()

            const newAdmin = new Admins({
                firstName, lastName, email: email.toLowerCase(), password
            })

            await newAdmin.save()

            newUser.userId = newAdmin._id
            newUser.role = "Admin"

            newAdmin.user = newUser

            await newUser.save()
            await newAdmin.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const admin = await Admins.findOne({email: email.toLowerCase()})
            if(!admin) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, admin.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({ id: admin._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/admin/refresh_token',
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

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({ id: admin.id })
                res.json({access_token})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const admin = await Admins.findOne({email: email.toLowerCase()})
            if(!admin) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: admin._id})
            const url = `${CLIENT_URL}/admin/reset/${access_token}`

            employeeSendMail(email, admin.firstName, url, "Reset your password")

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

            await Admins.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const admin = await Admins.findById(req.user.id).select('-password')

            res.json(admin)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/admin/refresh_token'})

            return res.json({msg: "Logged out."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { firstName, lastName, avatar } = req.body
            const admin = await Admins.findById({_id: req.user.id})

            await Admins.findOneAndUpdate({_id: req.user.id}, {
                firstName, lastName, avatar
            })

            await Users.findOneAndUpdate({userId: admin._id}, {
                firstName, lastName, avatar
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getParentsAllInfor: async (req, res) => {
        try {
            const features = new APIParentFeatures(Parents.find().select('-password'), req.query).filtering().sorting().paginating()
            const parent = await features.query
            const total_parents = await Parents.find()

            res.json({
                status: 'success',
                result: parent.length,
                parent: parent,
                total_parents: total_parents.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getTeachersAllInfor: async (req, res) => {
        try {
            const features = new APITeacherFeatures(Teachers.find().populate('teams').select('-password'), req.query).filtering().sorting().paginating()
            const teacher = await features.query
            const total_teachers = await Teachers.find()

            res.json({
                status: 'success',
                result: teacher.length,
                teacher: teacher,
                total_teachers: total_teachers.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getStudentsAllInfor: async (req, res) => {
        try {
            const features = new APIStudentFeatures(Students.find().populate('parent').populate('grade').populate('team').select('-password'), req.query).filtering().sorting().paginating()
            const student = await features.query
            const total_students = await Students.find()

            res.json({
                status: 'success',
                result: student.length,
                student: student,
                total_students: total_students.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteParents: async (req, res) => {
        try {
            const student = await Students.findOne({parent: req.params.id})
            if(student) return res.status(400).json({
                msg: "Please delete all the students with a relationship."
            })

            const parent = await Parents.findById(req.params.id)

            await Users.findByIdAndDelete(parent.user)

            await Parents.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTeachers: async (req, res) => {
        try {

            const teacher = await Teachers.findById(req.params.id)

            await Users.findByIdAndDelete(teacher.user)

            await Teachers.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteStudents: async (req, res) => {
        try {

            await Parents.findOneAndUpdate({students: req.params.id}, {$pull: {"students": req.params.id}})
            
            const student = await Students.findById(req.params.id)

            await Users.findByIdAndDelete(student.user)

            await Students.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})

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


module.exports = adminCtrl