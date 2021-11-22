const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Issue',
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)