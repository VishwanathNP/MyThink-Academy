const router = require('express').Router()
const teamsCtrl = require('../../controllers/Teams/Team.Ctrl')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')

router.route('/teams')
    .get(teamsCtrl.getTeams)
    .post(auth, adminAuth, teamsCtrl.createTeams)

router.route('/teams/:id')
    .delete(auth, adminAuth, teamsCtrl.deleteTeams)
    .put(auth, adminAuth, teamsCtrl.updateTeams)

module.exports = router