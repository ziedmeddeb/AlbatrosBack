const express=require('express');
const asyncHandler=require('express-async-handler');
const imageService=require('../services/imageService');
const imageController=express.Router();
imageController.get('/apart/:id',asyncHandler(async(req,res)=>{
    const images=await imageService.getImagebyApartId(req.params.id);
    res.json(images);

}
));
imageController.post('/add',asyncHandler(async(req,res)=>{
    const image=await imageService.createImage(
        req.body.appartement,
        req.body.img
    );
    res.json(image);
}
));
imageController.delete('/delete/:id',asyncHandler(async(req,res)=>{
    const image=await imageService.deleteImage(req.params.id);
    res.json(image);
}
));
module.exports=imageController;
