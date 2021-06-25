const mongoose = require('mongoose');

const receiveSMSSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAT: String,
    sourceAddress: String,
    requestId: String,
    applicationId: String,
    message: String
});

module.exports = mongoose.model('receiveSMS', receiveSMSSchema, 'receivedsms');
