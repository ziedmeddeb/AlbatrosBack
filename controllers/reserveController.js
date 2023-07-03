const express=require('express');
const asyncHandler=require('express-async-handler');
const reserveService=require('../services/reserveService');
const reserveController=express.Router();
reserveController.get('/apart/:id',asyncHandler(async(req,res)=>{
    const reserves=await reserveService.getReserveByApartId(req.params.id);
    res.json(reserves);

}
));
reserveController.post('/add',asyncHandler(async(req,res)=>{
    const reserve=await reserveService.createReserve(
        req.body.appartement,
        req.body.user,
        req.body.date,
        req.body.cin,
        req.body.region,
        req.body.ntel,
        req.body.firstName,
        req.body.lastName,
        req.body.remarque,
        req.body.status
    );
    res.json(reserve);
}
));

reserveController.get('/apart/:id/date/:date',asyncHandler(async(req,res)=>{
    const reserves=await reserveService.getReserveByApartIdAndDate(req.params.id,req.params.date);
    res.json(reserves);
}
));

reserveController.put('/update/:id/:status/:remarque',asyncHandler(async(req,res)=>{
    const reserve=await reserveService.updateReservStatus(req.params.id,req.params.status,req.params.remarque);
    res.json(reserve);
}
));

reserveController.put('/annuler/:id',asyncHandler(async(req,res)=>{
    const reserve=await reserveService.annulerReserv(req.params.id);
    res.json(reserve);
}
));

reserveController.get('/get/reserByDate/:date',asyncHandler(async(req,res)=>{
    const reserves=await reserveService.getReserveByDate(req.params.date);
    res.json(reserves);
}
));
module.exports=reserveController;