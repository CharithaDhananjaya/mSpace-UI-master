const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const router = express.Router();

const spDetails = require('../models/spdetails');

router.post('/', (req, res, next) => {
    console.log("Adding SPDetails");
    spdetails = new spDetails();

    spdetails.collection.insertMany(req.body, (error, docs) => {
        if (error) {
            res.status(400).json({
                error: error
            });
        } else {
            res.status(200).json({
                status: "Success",
                created: docs
            });
        }
    });

});

router.get('/', (req, res, next) => {

    spDetails.find({}, (error, result) => {
        if (error) {
            res.json(500).json({
                error: error
            });
        } else {
            res.status(200).json({
                sdDetails: result
            });
        }
    });
});



module.exports = router;
