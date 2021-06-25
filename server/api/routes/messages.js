const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Message = require('../models/messages');

router.post('/', (req, res, next) => {
    console.log("Adding a Message...!");
    const time = new Date(Date.now());

    const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        createdAT: time.toLocaleString('en-GB', { timeZone: 'GMT' }) + ' GMT+00:00',
        length: req.body.message.length,
        message: req.body.message,
        tags: req.body.tags
    });
    message
        .save()
        .then(result => {
            res.status(200).json({
                status: "Message Added Succesfully",
                created: result
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        })

});

router.get('/', (req, res, next) => {

    Message.find({})
        .exec()
        .then(messages => {
            res.status(200).json({
                messages: messages
            });
        })
        .catch(error => {
            res.status(200).json({
                error: error
            });
        });

});

module.exports = router;
