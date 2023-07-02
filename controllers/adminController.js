const asyncHandler = require("express-async-handler");
const express = require("express");
const adminServices = require('../services/adminService');
const adminController = express.Router();
adminController.post('/login',asyncHandler(async (req,res)=>{
    const admin=await adminServices.login(
        req.body.identifiant,
        req.body.password
    );
    res.json(admin);
}
)); 
module.exports= adminController;