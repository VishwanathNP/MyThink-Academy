const router = require('express').Router()
const headingCtrl = require('../../controllers/Courses/Heading.Ctrl')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')

router.route('/heading')
    .get(headingCtrl.getHeadings)
    .post(auth, adminAuth, headingCtrl.createHeadings)

router.route('/heading/:hid')
    .delete(auth, adminAuth, headingCtrl.deleteHeadings)
    .put(auth, adminAuth, headingCtrl.updateHeadings)


module.exports = router