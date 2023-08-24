const express=require('express');
const asyncHandler=require('express-async-handler');
const notificationService=require('../services/notificationService');
const notificationController=express.Router();
notificationController.post('/stock',asyncHandler(async(req,res)=>{
    const notification=await notificationService.StockUser(
        req.body.endpoint,
        req.body.p256dh,
        req.body.auth,
        req.body.role
    );
    res.json(notification);
}
));
module.exports=notificationController;