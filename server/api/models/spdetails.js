const mongoose = require('mongoose');

const spdetailsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    spID: String,
    spmobileNumber: String,
    spEmail: String,
    messages: String
}, {
    versionKey: false
});

module.exports = mongoose.model('spdetails', spdetailsSchema, 'spdetails');
