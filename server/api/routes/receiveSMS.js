const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const receiveSMS = require("../models/receivesms");

router.post('/', (req, res, next) => {
    console.log("Received SMS");
    const time = new Date(Date.now());

    const receivesms = new receiveSMS({
        _id: new mongoose.Types.ObjectId(),
        createdAT: time.toLocaleString('en-GB', { timeZone: 'GMT' }) + ' GMT+00:00',
        sourceAddress: req.body.data.sourceAddress,
        requestId: req.body.data.requestId,
        applicationId: req.body.data.applicationId,
        message: req.body.data.message
    });
    receivesms
        .save()
        .then(result => {
            res.status(200).json({
                status: result
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});

module.exports = router;