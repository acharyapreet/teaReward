const mongoose = require('mongoose');
const PurchaseSchema = new mongoose.Schema({
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
    },
    teaPrice: { type: Number, required: true },
    pointsEarned: { type: Number, required: true },
    milestoneLinked: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', default: null }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);