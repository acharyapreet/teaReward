const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')
const { error } = require('console')
const UnauthorizedError = require('../utilities/unauthorizedError')

async function isLoggedIn(req, res, next){
    const token = req.cookies['authToken']
    if(!token){
        return res.status(401).json({
            success : false,
            error : "no authentication",
            message : 'no auth token provided',
            data : {}
        })
    }
    try{
        const decoded = await jwt.verify(token, JWT_SECRET)

        if(!decoded){
            throw new UnauthorizedError();
        }
        // if user is here so he is authenticated 
        req.user ={
            email : decoded.email,
            id : decoded.id,
            role : decoded.role
        }

        next()
    }catch(error){
        return res.status(401).json({
            success : false,
            error : error,
            message : 'invalid token provided',
            data : {}
        })
    }


}
/**This check if authorized user is admin or not
 * we will  call isAdmin  after isLogged in so thats why we can get user details
 */
async function isAdmin(req, res, next) {
    const loggedInUser = req.user ;
    if(loggedInUser.role ==='ADMIN'){
        next()
    }else{
        return res.status(401).json({
            success : false,
            data : {},
            message : "you are not authorized for this action",
            error : {
                statusCode : 401,
                reason : 'unauthorized user for this action'
            }
        })
    }

    
}

module.exports = {
    isLoggedIn,
    isAdmin
}