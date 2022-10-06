const router = require('express').Router()
const chatCtrl = require('../../controllers/Chat/Chat.Ctrl')
const auth = require('../../middleware/auth')

router.route('/chat')
    .get(chatCtrl.getChat)
    .post(auth, chatCtrl.createChat)

router.route('/chat/:cid')
    .delete(auth, chatCtrl.deleteChat)
    .put(auth, chatCtrl.updateChat)


module.exports = router