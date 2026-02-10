const mongoose=require('mongoose');
const appartementSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    code:
    {
        type: String,
        required: true
    },
    image:{
        type: String
    },
    description:{
        type: String,
        required: true
    } ,
    price: {
        type: Number,
        required: true
    },
    categ:{
        type:String,
        required:true,
        enum:['S+1','S+2','S+3']
    }
});
const appartement = mongoose.model('appartement',appartementSchema);
module.exports = appartement;