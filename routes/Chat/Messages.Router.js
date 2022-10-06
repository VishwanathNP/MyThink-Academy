const router = require('express').Router()
const chatCtrl = require('../../controllers/Chat/Chat.Ctrl')
const auth = require('../../middleware/auth')

router.route('/messages/:cid')
    .get(chatCtrl.getMessages)


module.exports = router