const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    ntel: {
        type:String,
        required:true,
        minlength:8,
        maxlength:8

    },
    password: {
        type:String,
        required:true
    },
    joinedDate: {
        type:Date,
        default:Date.now
    },
    role: {
        type:String,
        default:"user"
    },
});
const User=mongoose.model('User',userSchema);
module.exports= User;