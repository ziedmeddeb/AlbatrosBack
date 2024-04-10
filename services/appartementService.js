const apartement= require('../models/appartement');
const apartService = {
    async getAllApart() {
        try{
        const aparts=await apartement.find().sort({ code: 1 });
        if(!aparts)
        {
            throw new Error('No aparts found');
        }
        return aparts;
    }
    catch(err)
    {
        console.log(err);
    }
    },
    async getApartById(id) {
        try{
        const apart=await apartement.findById(id);
        if(!apart)
        {
            throw new Error('No apart found');
        }
        return apart;
    }catch(err)
    {
        console.log(err);
    }
    },
    async createApart(
        name,
        description,
        price,
        categ,
        code
    ) {
        const apart=await apartement.create({
            name,
        description,
        price,
        categ,
    code});
        if(!apart)
        {
            throw new Error('Error creating apart');
        }
        await apart.save();
        return apart;
    },
    async updateApart(
        id,
        data
    ) {
        try{
        const apart=await apartement.findById(id);
        if(!apart)
        {
            throw new Error('No apart found');
        }
        apart.name=data.name;
        apart.description=data.description;
        apart.price=data.price;
        apart.categ=data.categ;
        apart.code=data.code;
        await apart.save();
        return apart;
    }
    catch(err)
    {
        console.log(err);
    }
    },
    async deleteApart(id) {
        try{
        const apart=await apartement.findById(id);
        if(!apart)
        {
            throw new Error('No apart found');
        }
        await apartement.findByIdAndDelete(id);
        return apart;
    }catch(err)
    {
        console.log(err);
    }
    },
    async filterApart(categ){
        try{
        const aparts=await apartement.find({categ:categ});
        if(!aparts)
        {
            throw new Error('No aparts found');
        }
        return aparts;
    }
    catch(err)
    {
        console.log(err);
    }

    }
};
module.exports = apartService;
