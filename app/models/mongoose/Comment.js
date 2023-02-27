const mongoose = require('mongoose');

// fields definition
const fields = {
    userId : {
        type : String,
        required: 'User Id is required'
    },
    postId: {
        type: String,
        required: 'Post Id is required'
    },
    content: {
        type: String
    }

}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('Comment', schema);

module.exports = model;