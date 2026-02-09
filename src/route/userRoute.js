const express = require('express');
const { userController } = require('../controller/userController');
const uploader = require('../middleware/multerMiddleware')
const userRouter = express.Router()

userRouter.post('/',uploader.single('profileImage'),userController)

module.exports = userRouter;


