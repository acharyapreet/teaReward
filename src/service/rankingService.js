const User = require("../schema/userSchema");

async function assignInitialRank(userId){
    const totalUsers = await User.countDocuments({role : "ADMIN"});
    const newRank = totalUsers + 1;
    await User.findByIdAndUpdate(userId, {currentRank : newRank,
        lastRankChangeDate : new Date()
    });
    return newRank;
}   

async function rotateRanks(prizeWinnerId) {
    const totalUsers = await User.countDocuments({role : "ADMIN"});

    //last rank to winner
    await User.findByIdAndUpdate(prizeWinnerId,{
        currentRank : totalUsers,
        lastRankChangeDate : new Date()
    });

    //give +1 rank to rest user
    await User.updateMany({
        _id : {$ne : prizeWinnerId},
    },{$inc : { currentRank : -1}});
    

}