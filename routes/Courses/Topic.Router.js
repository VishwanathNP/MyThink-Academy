const router = require('express').Router()
const topicCtrl = require('../../controllers/Courses/Topic.Ctrl')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')

router.route('/topic')
    .get(topicCtrl.getTopics)
    .post(auth, adminAuth, topicCtrl.createTopics)

router.route('/topic/:cid/:tid')
    .delete(auth, adminAuth, topicCtrl.deleteTopics)
    .put(auth, adminAuth, topicCtrl.updateTopics)


module.exports = router