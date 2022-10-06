const Chatroom = require('../../models/Chat/Chatroom.Model')
const Messages = require('../../models/Chat/Message.Model')

const chatCtrl = {
    getChat: async(req, res) => {
        try {
            const chatroom = await Chatroom.find()
            res.json(chatroom)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createChat: async(req, res) => {
        try {
            
            const { name } = req.body

            const chatroom = await Chatroom.findOne({name: name.toLowerCase()})
            if(chatroom) return res.status(400).json({msg: "This chatroom already exists."})

            const newChatroom = new Chatroom({
                name: name.toLowerCase()
            })

            await newChatroom.save()

            res.json({msg: "Created a chatroom."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteChat: async(req, res) => {
        try {

            await Chatroom.findByIdAndDelete(req.params.cid)
            
            res.json({msg: "Deleted a chatroom"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateChat: async(req, res) => {
        try {
            
            const { name } = req.body

            await Chatroom.findByIdAndUpdate({_id: req.params.cid}, {
                name
            })

            res.json({msg: "Update a chatroom"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMessages: async (req, res) => {
        try {
            const oldMessages = await Messages.find({chatroom: req.params.cid})

            res.json(oldMessages)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = chatCtrl