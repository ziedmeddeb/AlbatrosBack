const mongoose=require('mongoose');
const reserveSchema = new mongoose.Schema({
    appartement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appartement',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    firstName:{
        type:String,
        default:""


    },
    lastName:{
        type:String,
        default:""

    },
    date:{
        type:Date,
        required:true
    },
    
    dateRes:{
        type:Date,
        
        
    },
    ntel:{
        type:String,
        
    },
    status:{
        type:String,
        default:"pending"
    },
    remarque:{
        type:String,
        default:""
    },
    nom:
    {
        type:String,
        default:""
    }
});
const reserve = mongoose.model('reserve',reserveSchema);
module.exports = reserve;