const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {findUser} = require('../repository/userRepository');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/serverConfig');
async function authService(authDetails){
    console.log("1. Data received in Service:", authDetails);
    const email = authDetails.email;
    const hashedPassword = authDetails.password;
    //check email exist or not
    const user = await findUser({email})
    console.log("2. Result from Database:", user);
    if (!user){
        console.log("3. Login failed: No user found for email:", email);
        throw{message: 'user not found', statusCode: 404}
    }
    // check is password correct or not
    const isPasswordValid = await bcrypt.compare(hashedPassword, user.password)
    if(!isPasswordValid){
        throw{message: 'password incorrect', statusCode: 401}
    }

    const userRole = user.role ? user.role : 'USER'
    const token = jwt.sign({email : user.email, id : user.id, role : userRole},
        JWT_SECRET,
        {expiresIn : JWT_EXPIRE}
    )
    return token ;
}

module.exports = {authService}
