const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mSpace-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => {
        console.log("DB Connection Success...!");
    })
    .catch(err => {
        console.log("DB Connection Failed:\n", err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sendSMS = require('./api/routes/sendSMS');
const receiveSMS = require('./api/routes/receiveSMS');
const message = require('./api/routes/messages');
const spDetails = require('./api/routes/spDetails');

app.use('/sendSMS', sendSMS);
app.use('/receiveSMS', receiveSMS);
app.use('/message', message);
app.use('/spDetails', spDetails);

app.get('/', (req, res) => {
    res.status(200).json({
        Status: "mSpace UI api-server running...!"
    });
});

module.exports = app;
