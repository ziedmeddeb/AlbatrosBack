const image=require('../models/image');
const cloudinary = require('../config/cloudinary')
const imageService = {
    async getImagebyApartId(id) {
        try{
        const images=await image.find({appartement:id});
        if (!images) {
            throw new Error('No images found');
        }
        return images;
    }catch(err)
    {
        console.log(err);
    }
    },
    async createImage(
        appartement,
        img
    ) {
        try{
        const cloudinaryResponse = await cloudinary.uploader.upload(img);
        const imgURL = cloudinaryResponse.secure_url;
      
        const imag = await image.create({
          appartement,
          img: imgURL
        });
      
        if (!imag) {
          throw new Error('Error creating image');
        }
      
        await imag.save();
      
        return imag;
    }catch(err)
    {
        console.log(err);
    }
    },
    async deleteImage(id) {
        const imag=image.findById(id);
        if (!imag) {
            throw new Error('No image found');
        }
        await image.findByIdAndDelete(id);
        return imag;
    }
};
module.exports = imageService;
