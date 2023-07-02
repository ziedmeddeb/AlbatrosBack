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
            }
        }


    ]

});
const calendrier = mongoose.model('calendrier',calendrierSchema);
module.exports = calendrier;