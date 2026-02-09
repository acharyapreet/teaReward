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
    currentRank : {
        type : Number,
        uniqui : true,
        sparse : true
    },totalTeasConsumed: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false }
 
}, {
    timestamps : true
});

userSchema.pre('save',async function(){
    // here you can modify the user before saving it
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
});

const User = mongoose.model('User',userSchema);
module.exports = User;