const mongoose = require('mongoose');

const sendSMSShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAT: String,
    appStatus: String,
    alias: String,
    requestId: String,
    sendSMS: String,
    statusCode: String,
    statusDetail: String,
    userResponses: [{
        timeStamp: String,
        address: String,
        messageId: String,
        statusCode: String,
        statusDetail: String
    }]

}, {
    versionKey: false
});

module.exports = mongoose.model('sendSMS', sendSMSShema, 'sendsms');
