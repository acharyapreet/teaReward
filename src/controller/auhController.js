// const User = require("../schema/userSchema");
const { authService } = require("../service/authService");

async function login(req, res){
    try {
        const payload = req.body;
        const response = await authService(payload)
        res.cookie( 'authToken', response, {
            maxAge : 12 * 60 * 60 * 1000,
            httpOnly : true,
            secure : false
        })
        return res.status(200).json({
            success : true,
            error : {},
            data : {},
            message : "user login successfully"
        })
    } catch (error) {
        console.log('error occured : ',error)
        return res.status(error.statusCode).json({
            success : false,
            error : error,
            data : {},
            message : error.reason
        })
    }
}
async function logout(req, res){
    try {
        res.cookie( 'authToken', "", {
            maxAge : 12 * 60 * 60 * 1000,
            httpOnly : true,
            secure : false
        })
        return res.status(200).json({
            success : true,
            error : {},
            data : {},
            message : "user logout successfully"
        })
    } catch (error) {
        console.log('error occured : ',error)
        return res.status(error.statusCode).json({
            success : false,
            error : error,
            data : {},
            message : error.reason
        })
    }
}

module.exports = {
    login,
    logout
}