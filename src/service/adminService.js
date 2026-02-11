const User = require("../schema/userSchema");

async function promoteToAdmin(userId) {
    try{const user = await User.findById(userId);
    if(!user){
        throw{
            message : "User not found"
        }
    }
    if(user.role == 'ADMIN'){
        throw{
            message : "User is already an Admin"
        }
    }
    user.role = "ADMIN";
    user.currentRank = null;

    await user.save();
    return user;
}
    catch(error){
        throw {
            message : error.message
        }
        
    }

}
async function demotionToUser(userId) {
    try{const user = await User.findById(userId);
    if(!user){
        throw{
            message : "User not found"
        }
    }
    if(user.role == "USER"){
        throw{
            message : "User is already not an Admin"
        }
    }
    user.role = "USER";
    
    //giving last rank to user
    const totalUser = await User.countDocuments({role : 'USER'});
    user.currentRank = totalUser + 1;
    
    await user.save();
    return user;
}catch(error){
    throw{
        message : error.message
    }
}
}
//to show all admin
async function showAdmins() {
    return await User.find({role : 'ADMIN'})
    .select("-password")
    .sort("createdAt");
}

module.exports = {
    promoteToAdmin,
    demotionToUser,
    showAdmins
}