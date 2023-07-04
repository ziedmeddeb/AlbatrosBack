const colab=require('../models/colab');
const colabToken=require('../config/token');
const colabService = {
    async register(firstName,lastName,identifiant,password) {
        const colaborateur= await colab.create({
            firstName:firstName,
            lastName:lastName,
            identifiant:identifiant,
            password:password
        });
        colaborateur.save();
        return {token:colabToken(colaborateur._id)};
    },
    async login(identifiant,password) {
        const colaborateur= await colab.findOne({identifiant:identifiant,password:password});
        if (!colaborateur) {
            throw new Error('No colaborateur found');
        }
        return {token:colabToken(colaborateur._id)};
    },
    async getColabById(id) {
        const colaborateur= await colab.findById(id);
        if (!colaborateur) {
            throw new Error('No colaborateur found');
        }
        return colaborateur;
    }
};
module.exports = colabService;

