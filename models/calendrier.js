const mongoose = require('mongoose');
const calendrierSchema = new mongoose.Schema({
    appartement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appartement',
        required:true
    },
    availabilities:[
        {
            dateDeb:{
                type:Date,
                required:true
            },
            dateFin:{
                type:Date,
                required:true
            },
            available:{
                type:Boolean,
                required:true
            },
            price:{
                type:Number,
                default:0
            },
            status:{
                type:String,

            },
            
                persId:{
                type:mongoose.Schema.Types.ObjectId,
                default:""
                },
                role:{
                    type:String,
                    default:""
                
            }
            

        }


    ]

});
const calendrier = mongoose.model('calendrier',calendrierSchema);
module.exports = calendrier;