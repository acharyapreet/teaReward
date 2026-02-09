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
    }
});

module.exports = mongoose.model("Milestone", milestoneSchema);