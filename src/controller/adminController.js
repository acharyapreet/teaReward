
async function adminPromotionController(req,res){
    const userDetail = req.params;
    try {
        const response = await promoteToAdmin(userDetail.userId);
        console.log(response)
        return res.status(201).json({
            success : true,
            message : 'user created successfully',
            data : response,
            error : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode||500).json({
            success : false,
            message : error.message,
            data : {},
            error : error
        })
    }
}

module.exports = {
    userController
}