const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/mSpace-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(db => {
            console.log("DB Connection Success...!");
            return db;
        })
        .catch(err => {
            console.log("DB Connection Failed:\n", err);
        });
}

module.exports = dbConnection;