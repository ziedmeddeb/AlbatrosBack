
const asyncHandler = require("express-async-handler");
const express = require("express");
const userServices = require('../services/userService');
const userController = express.Router();
userController.get('/all',asyncHandler(async (req,res)=>{
    const users=await userServices.getAllUsers();
    res.json(users);
}));
userController.get('/get/:id',asyncHandler(async (req,res)=>{
    const user=await userServices.getUserById(req.params.id);
    res.json(user);
}
));
userController.post('/create',asyncHandler(async (req,res)=>{
    const user=await userServices.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    );
    res.json(user);
}
));
userController.put('/update/:id',asyncHandler(async (req,res)=>{
    const user=await userServices.updateUser(
        req.params.id,
        req.body
    );
    res.json(user);
}
));
userController.delete('/delete/:id',asyncHandler(async (req,res)=>{
    const user=await userServices.deleteUser(req.params.id);
    res.json(user);
}
));

userController.post('/login',asyncHandler(async (req,res)=>{
    const user=await userServices.login(
        req.body.email,
        req.body.password
    );
    res.json(user);
}
));
userController.put('/changePass/:id',asyncHandler(async (req,res)=>{
    const user=await userServices.changerMotdePasse(
        req.params.id,
        req.body
    );
    res.json(user);
    
}));
module.exports= userController;

