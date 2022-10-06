const Admins = require('../models/Users/Admin.Model')

const adminAuth = async (req, res, next) => {
    try {
        const admin = await Admins.findOne({_id: req.user.id})

        if(admin.role !== 0)
            return res.status(400).json({msg: "Admin resources access denied."})

        next()

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = adminAuth