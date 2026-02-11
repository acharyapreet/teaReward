const express = require('express');
const { isAdmin, isLoggedIn } = require('../validation/authValidator');
const { adminPromotionController, adminDemotionController, showAdminsController, getAllUserController } = require('../controller/adminController');
const adminRouter = express.Router();
adminRouter.post('/promote/:userId',isLoggedIn, isAdmin, adminPromotionController);
adminRouter.post('/demote/:userId', isLoggedIn, isAdmin, adminDemotionController);
adminRouter.post('/list', isLoggedIn, isAdmin, showAdminsController);
adminRouter.post('/users', isLoggedIn, isAdmin, getAllUserController);

module.exports = adminRouter;