const asyncHandler = require("express-async-handler");
const express = require("express");
const calendrierServices = require('../services/calendrierService');
const calendrierController = express.Router();
calendrierController.get('/get/:apart',asyncHandler(async (req,res)=>{
    const calendrier=await calendrierServices.getCalenderByApartId(req.params.apart);
    res.json(calendrier);
}
));
calendrierController.post('/create',asyncHandler(async (req,res)=>{
    const calendrier=await calendrierServices.createCalender(
        req.body.appartement
    );
    res.json(calendrier);
}
));
calendrierController.put('/update/:id',asyncHandler(async (req,res)=>{
    const calendrier=await calendrierServices.updateCalender(
        req.params.id,
        req.body
    );
    res.json(calendrier);
}
));

calendrierController.put('/update/:idApart/:idDate/:status/:persId/:role',asyncHandler(async (req,res)=>{
    const calendrier=await calendrierServices.updateCalenderBydate(
        req.params.idApart,
        req.params.idDate,
        req.params.status,
        req.params.persId,
        req.params.role
    );
    res.json(calendrier);
}
));

calendrierController.put('/update2/:idApart/:idDate/:status',asyncHandler(async (req,res)=>{
    const calendrier=await calendrierServices.updateCalenderBydate2(
        req.params.idApart,
        req.params.idDate,
        req.params.status
    );
    res.json(calendrier);
}
));
module.exports= calendrierController;
