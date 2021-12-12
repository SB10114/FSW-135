const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    votes: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Issue", issueSchema)