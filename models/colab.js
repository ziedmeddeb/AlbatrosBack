const mongoose = require('mongoose');
const colabSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true

    },
    identifiant:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"colab"
    }
});
const colab = mongoose.model('colab',colabSchema);
module.exports = colab;