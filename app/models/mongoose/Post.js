const mongoose = require('mongoose');

// fields definition
const fields = {
    userId : {
        type : String,
        required: 'User Id is required'
    },
    slug: {
        type: String,
    },
    title: {
        type: String
    },
    content: {
        type: String
    }

}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('Post', schema);

module.exports = model;