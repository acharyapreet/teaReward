const {findUser, createUser} = require('../repository/userRepository');
//function to create a new user
async function signUpUser(userDetail){
// check if user already exists by email and mobile number
    const user = await findUser({
        email : userDetail.email,
        phone : userDetail.phone
    })

    if(user){
        throw {reason : "user already exist", statusCode : 400} 
    
    }

    // if user does not exist, create new

    const newUser = await createUser({
        email : userDetail.email,
        name : userDetail.name,
        password : userDetail.password,
        phone : userDetail.phone,
        referalCode : userDetail.referalCode
        
    })
    if(!newUser){
        throw {reason : "error in creating user", statusCode : 500};
    };

    return newUser;
   
}
module.exports = {
    signUpUser
}
