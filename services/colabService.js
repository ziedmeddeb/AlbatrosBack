const colab=require('../models/colab');
const colabToken=require('../config/token');
const colabService = {
    async register(firstName,lastName,identifiant,password,role) {
        try{
        const colabident= await colab.findOne({identifiant:identifiant});
        if (colabident) {
            throw new Error('Colaborateur already exists');
        }

        const colaborateur= await colab.create({
            firstName,
            lastName,
            identifiant,
            password,
            role
        });
        colaborateur.save();
        return {token:colabToken(colaborateur._id)};
    }
    catch(err)
    {
        console.log(err);
    }
    },
    async login(identifiant,password) {
        try{
        const colaborateur= await colab.findOne({identifiant:identifiant,password:password});
        if (!colaborateur) {
            throw new Error('No colaborateur found');
        }
        return {token:colabToken(colaborateur._id)};
    }
    catch(err)
    {
        console.log(err);
    }
    },
    async getColabById(id) {
        try{
        const colaborateur= await colab.findById(id).select('-password');
        if (!colaborateur) {
            throw new Error('No colaborateur found');
        }
        return colaborateur;
    }
    catch(err)
    {
        console.log(err);
    }
    },
    }

module.exports = colabService;

