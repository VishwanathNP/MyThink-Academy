const Chapters = require('../../models/Course/Chapter.Model')
const Topics = require('../../models/Course/Topic.Model')

class APIChapterFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryOdj = {...this.queryString} //queryString = req.query
        const excludedFields = ['page']
        excludedFields.forEach(el => delete(queryOdj[el]))

        let queryStr = JSON.stringify(queryOdj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }
}

const chapterCtrl = {
    getChapters: async(req, res) => {
        try {

            const features = new APIChapterFeatures(Chapters.find().populate('grade').populate('heading').populate({path: 'topic', populate: {path: 'chapter', model: 'Chapters'}}), req.query).filtering()
            const chapter = await features.query

            res.json({
                status: 'success',
                result: chapter.length,
                chapter: chapter,
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createChapters: async(req, res) => {
        try {
            const { grade, heading, chapter, description, image } = req.body

            const newChapter = new Chapters({
                grade, heading, chapter: chapter.toLowerCase(), description: description.toLowerCase(), image
            })
            await newChapter.save()
            
            res.json({msg: "Created a chapter."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteChapters: async(req, res) => {
        try {
            const topic = await Topics.findOne({chapter: req.params.cid})
            if(topic) return res.status(400).json({
                msg: "Please delete all the topics with a relationship."
            })

            await Chapters.findByIdAndDelete(req.params.cid)
            res.json({msg: "Deleted a chapter"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateChapters: async(req, res) => {
        try {
            const { chapter, description } = req.body

            await Chapters.findByIdAndUpdate({_id: req.params.cid}, {
                chapter: chapter.toLowerCase(), description: description.toLowerCase()
            })

            res.json({msg: "Update a chapter"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = chapterCtrl