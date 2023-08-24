const mongoose=require('mongoose');
const notificationSchema=new mongoose.Schema({
    endpoint:{
        type:String,
        required:true
    },
    p256dh:{
        type:String,
        required:true
    },
    auth:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
});
const notification=mongoose.model('notification',notificationSchema);
module.exports=notification;