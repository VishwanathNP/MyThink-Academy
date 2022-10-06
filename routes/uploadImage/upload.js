const router = require('express').Router()
const uploadImage = require('../../middleware/uploadImage')
const uploadCtrl = require('../../controllers/uploadImage/Upload.Ctrl')
const auth = require('../../middleware/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)

module.exports = router