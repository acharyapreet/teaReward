const express = require('express');
const multer = require('multer');
const upload = multer(); // Initialize multer
const { userController } = require('../controller/userController');
const userRouter = express.Router();

// Use upload.none() to parse form-data text fields
userRouter.post('/', upload.none(), userController);

module.exports = userRouter;


