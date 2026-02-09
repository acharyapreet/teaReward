const userSchema = require('../schema/userSchema');

//function to create a new user
async function createUser(userDetail){
    try{
        const response = await userSchema.create(userDetail);
        return response;
    }catch(error){
        console.log('error in creating user', error);
    }
}

// function to find a user 
async function findUser(parameter){
    try{
        const response = await userSchema.findOne({
            ...parameter
        })
        return response;
    }catch(error){
        console.log('error in finding user', error);
    }
}

module.exports = {
    createUser,
    findUser
}