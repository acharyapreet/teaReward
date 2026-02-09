const cloudinary = require('../config/cloudinaryConfig')
const {findUser, createUser} = require('../repository/userRepository');
const fs = require ('fs');
const uploader = require('../middleware/multerMiddleware')
//function to create a new user
async function signUpUser(userDetail, Userfile){
// check if user already exists by email and mobile number
    const user = await findUser({
        email : userDetail.email,
        mobileNo : userDetail.mobileNo
    })

    if(user){
        throw {reason : "user already exist", statusCode : 400} 
    
    }

    // if user does not exist, create new

    let profileImageUrl = '';
    if (Userfile) {
        try {
            const result = await cloudinary.uploader.upload(Userfile.path, {
                folder: 'user_profiles',
            });
            profileImageUrl = result.secure_url;

            // 2. Delete the local file after upload to keep server clean
            fs.unlinkSync(Userfile.path); 
        } catch (error) {
            console.log("CLOUDINARY ERROR DETAILS:", error);
            throw { reason: "Cloudinary Upload Failed", statusCode: 500 };
        }
    }
    const newUser = await createUser({
        email : userDetail.email,
        firstName : userDetail.firstName,
        lastName : userDetail.lastName,
        password : userDetail.password,
        mobileNo : userDetail.mobileNo,
        role : userDetail.role,
        profileImage: profileImageUrl,
        location: {
            country: userDetail.country,
            city: userDetail.city,
            timeZone: userDetail.timeZone
        }
    })
    if(!newUser){
        throw {reason : "error in creating user", statusCode : 500};
    };

    return newUser;
   
}
module.exports = {
    signUpUser
}
