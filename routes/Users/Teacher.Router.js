const router = require('express').Router()
const teacherCtrl = require('../../controllers/Users/Teacher.Ctrl')
const auth = require('../../middleware/auth')

router.post('/register', teacherCtrl.register)

router.post('/activation', teacherCtrl.activateEmail)

router.post('/login', teacherCtrl.login)

router.post('/refresh_token', teacherCtrl.getAccessToken)

router.post('/forgot', teacherCtrl.forgotPassword)

router.post('/reset', auth, teacherCtrl.resetPassword)

router.get('/infor', auth, teacherCtrl.getUserInfor)

router.get('/logout', teacherCtrl.logout)

router.patch('/update', auth, teacherCtrl.updateUser)



module.exports = router