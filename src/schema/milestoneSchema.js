const mongoose = require('mongoose');
const milestoneSchema = new mongoose.Schema({
    vendorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vendor",
        required : true
    },
    threshold : {
        type : String,
        required : true
    },
    isReached : {
        type : Boolean,
        default : false
    },
    prizeValue: { type: Number, required: true },
    reachedDate: Date,
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'claimed', 'paid'], default: 'pending' }
});

module.exports = mongoose.model("Milestone", milestoneSchema);