const router = require('express').Router()
const adminCtrl = require('../../controllers/Users/Admin.Ctrl')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')


router.post('/register', adminCtrl.register)

router.post('/activation', adminCtrl.activateEmail)

router.post('/login', adminCtrl.login)

router.post('/refresh_token', adminCtrl.getAccessToken)

router.post('/forgot', adminCtrl.forgotPassword)

router.post('/reset', auth, adminCtrl.resetPassword)

router.get('/infor', auth, adminCtrl.getUserInfor)

router.get('/logout', adminCtrl.logout)

router.patch('/update', auth,  adminCtrl.updateUser)

router.get('/all/parents', auth, adminAuth, adminCtrl.getParentsAllInfor)

router.get('/all/teachers', auth, adminAuth, adminCtrl.getTeachersAllInfor)

router.get('/all/students', auth, adminAuth, adminCtrl.getStudentsAllInfor)

router.delete('/parents/delete/:id', auth, adminAuth, adminCtrl.deleteParents)

router.delete('/teachers/delete/:id', auth, adminAuth, adminCtrl.deleteTeachers)

router.delete('/students/delete/:id', auth, adminAuth, adminCtrl.deleteStudents)


module.exports = router