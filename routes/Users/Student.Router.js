const router = require('express').Router()
const studentCtrl = require('../../controllers/Users/Student.Ctrl')
const auth = require('../../middleware/auth')

router.post('/login', studentCtrl.login)

router.post('/refresh_token', studentCtrl.getAccessToken)

router.get('/infor', auth, studentCtrl.getUserInfor)

router.get('/logout', studentCtrl.logout)

router.get('/enrollChapter', auth, studentCtrl.getEnrollChapters)

router.get('/enrollTopic', auth, studentCtrl.getEnrollTopics)

router.post('/enrollChapter/:cid', auth, studentCtrl.getEnrollChapters)

router.post('/enrollTopic/:tid', auth, studentCtrl.getEnrollTopics)

module.exports = router