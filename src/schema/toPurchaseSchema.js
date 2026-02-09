const mongoose = require('mongoose');
const toPurchaseSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
    },vendorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Vendor',
        required : true
    },pointsEarned : {
        type : Number,
        required : true
    },timestamp : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("ToPurchase", toPurchaseSchema);