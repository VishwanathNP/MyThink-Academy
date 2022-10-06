const router = require('express').Router()
const chapterCtrl = require('../../controllers/Courses/Chapter.Ctrl')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')

router.route('/chapter')
    .get(chapterCtrl.getChapters)
    .post(auth, adminAuth, chapterCtrl.createChapters)

router.route('/chapter/:cid')
    .delete(auth, adminAuth, chapterCtrl.deleteChapters)
    .put(auth, adminAuth, chapterCtrl.updateChapters)


module.exports = router