const User = require("../schema/userSchema");
const { demotionToUser, showAdmins, promoteToAdmin } = require("../service/adminService");

async function adminPromotionController(req,res){
    const userDetail = req.params;
    try {
        const response = await promoteToAdmin(userDetail.userId);
        console.log(response)
        return res.status(200).json({
            success : true,
            message : 'user promoted to admin successfully',
            data : response,
            error : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode||400).json({
            success : false,
            message : error.message,
            data : {},
            error : error
        })
    }
}
async function adminDemotionController(req, res) {
    const userDetail = req.params;
    try {
        const response = await demotionToUser(userDetail.userId);
        console.log(response)
        return res.status(200).json({
            success : true,
            message : 'admin demoted to user successfully',
            data : response,
            error : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode||400).json({
            success : false,
            message : error.message,
            data : {},
            error : error
        })
    }
}

async function showAdminsController(req, res) {
    try {
        const response = await showAdmins();
        console.log(response)
        return res.status(200).json({
            success : true,
            message : 'all admins',
            data : response,
            error : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode||400).json({
            success : false,
            message : error.message,
            data : {},
            error : error
        })
    }
}
async function getAllUserController(req, res) {
    try {
        const { page = 1, limit = 20, search = '' } = req.query;
        
        const query = { role: 'USER' };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }
        
        const users = await User.find(query)
            .select('name email phone currentRank totalTeasConsumed createdAt')
            .sort('currentRank')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
            
        const total = await User.countDocuments(query);
        
        res.status(200).json({
            users,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    adminPromotionController,
    adminDemotionController,
    showAdminsController,
    getAllUserController
}