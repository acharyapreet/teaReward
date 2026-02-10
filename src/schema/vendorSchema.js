const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const vendorSchema = new mongoose.Schema({
    shopId : {
        type: String,
        required : true
    },location : {
        type : String
    },totalTeaSold : {
        type : Number,
        default : 0
    },ownerName : {
        type : String
    },phone : {
        type: String, 
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits']
    },password : {
        type: String,
        required: true,
    },email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
       
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },isActive : {
        type : Boolean
    },
    milestonesReached: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }],
    totalEarnings: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false }
},{
    timestamps : true
});

vendorSchema.pre('save',async function(){
    // here you can modify the user before saving it
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
});

module.exports = mongoose.model("Vendor", vendorSchema);