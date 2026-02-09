const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

async function connectDB() {
    try {
        //connect to mongo db server
        await mongoose.connect(serverConfig.DB_URL);
        console.log('Successfully connected to database');
    } catch (error) {
        console.log("not able to connect to database")
        console.log(error)
    }
}

module.exports = connectDB;