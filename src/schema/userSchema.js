const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
       
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String, 
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits']
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    totalTeasConsumed: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    currentRank: { type: Number, default: null }, // not unique
    prizeBalance: { type: Number, default: 0 },
    isEligibleForWithdrawal: { type: Boolean, default: false },
    lastRankChangeDate: {type: Date},
    referalCode: {type: String}
 
}, {
    timestamps : true
});

userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;