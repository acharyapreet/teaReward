const express = require('express');
const {login, logout } = require('../controller/authController');
const multer = require('multer');
const upload = multer();
const authRouter = express.Router();

authRouter.post('/login', upload.none(),login)
authRouter.post('/logout',logout)

module.exports = authRouter;