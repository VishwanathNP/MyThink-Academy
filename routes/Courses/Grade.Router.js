const router = require('express').Router()
const gradeCtrl = require('../../controllers/Courses/Grade.Ctrl')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')

router.route('/grade')
    .get(gradeCtrl.getGrade)
    .post(auth, adminAuth, gradeCtrl.createGrade)

router.route('/grade/:id')
    .delete(auth, adminAuth, gradeCtrl.deleteGrade)
    .put(auth, adminAuth, gradeCtrl.updateGrade)


module.exports = router