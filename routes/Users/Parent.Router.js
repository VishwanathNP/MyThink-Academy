const router = require('express').Router()
const parentsCtrl = require('../../controllers/Users/Parent.Ctrl')
const auth = require('../../middleware/auth')

router.post('/register', parentsCtrl.register)

router.post('/activation', parentsCtrl.activateEmail)

router.post('/login', parentsCtrl.login)

router.post('/refresh_token', parentsCtrl.getAccessToken)

router.post('/forgot', parentsCtrl.forgotPassword)

router.post('/reset', auth, parentsCtrl.resetPassword)

router.get('/infor', auth, parentsCtrl.getUserInfor)

router.get('/logout', parentsCtrl.logout)

router.patch('/update', auth, parentsCtrl.updateUser)

router.post('/addchild', auth, parentsCtrl.addChild)

router.get('/childinfor', auth, parentsCtrl.getStudentInfor)

router.get('/child/:sid', auth, parentsCtrl.getStudent)


module.exports = router