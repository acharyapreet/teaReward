const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },lockedPoints : {
        type : Number,
        default : 0
    },
    withdrawablePoints : {
        type : Number,
        default : 0
    },
    totalEarned : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model("Wallet", walletSchema);