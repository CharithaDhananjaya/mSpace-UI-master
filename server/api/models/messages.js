const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAT: String,
    length: String,
    message: String,
    tags: [String]
}, {
    versionKey: false
});

module.exports = mongoose.model('message', messageSchema, 'messages');
