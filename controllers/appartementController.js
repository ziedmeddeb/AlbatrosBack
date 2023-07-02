const asyncHandler = require("express-async-handler");
const express = require("express");
const appartementServices = require('../services/appartementService');
const appartementController = express.Router();
appartementController.get('/all',asyncHandler(async (req,res)=>{
    const appartements=await appartementServices.getAllApart();
    res.json(appartements);
}
));
appartementController.get('/:id',asyncHandler(async (req,res)=>{
    const appartement=await appartementServices.getApartById(req.params.id);
    res.json(appartement);
}
));
appartementController.post('/create',asyncHandler(async (req,res)=>{
    const appartement=await appartementServices.createApart(
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.categ,
        req.body.code
    );
    res.json(appartement);
}
)); 
appartementController.put('/update/:id',asyncHandler(async (req,res)=>{
    const appartement=await appartementServices.updateApart(
        req.params.id,
        req.body
    );
    res.json(appartement);
}
));
appartementController.delete('/delete/:id',asyncHandler(async (req,res)=>{
    const appartement=await appartementServices.deleteApart(req.params.id);
    res.json(appartement);
}));

appartementController.get('/filter/:categ',asyncHandler(async (req,res)=>{
    const appartements=await appartementServices.filterApart(req.params.categ);
    res.json(appartements);

}));

module.exports= appartementController;