const Topics = require('../../models/Course/Topic.Model')
const Chapters = require('../../models/Course/Chapter.Model')

const topicCtrl = {
    getTopics: async(req, res) => {
        try {
            const topic = await Topics.find().populate('chapter')
            res.json(topic)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTopics: async(req, res) => {
        try {
            const { chapter, topic, description, image } = req.body

            const chap = await Chapters.findById(chapter)

            const newTopic = new Topics({
                chapter, topic: topic.toLowerCase(), description: description.toLowerCase(), image
            })

            
            await newTopic.save().then(cat => {
                chap.topic.push(newTopic)
                chap.save()
            })
            res.json({msg: "Created a topic."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTopics: async(req, res) => {
        try {
            await Chapters.findByIdAndUpdate(req.params.cid, {$pull: {"topic": {_id: req.params.tid}}})
            
            await Topics.findByIdAndDelete(req.params.tid)
            res.json({msg: "Deleted a topic."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTopics: async(req, res) => {
        try {
            const { topic, description } = req.body

            await Topics.findByIdAndUpdate({_id: req.params.tid}, {
                topic: topic.toLowerCase(), description: description.toLowerCase()
            })

            res.json({msg: "Update a topic."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = topicCtrl