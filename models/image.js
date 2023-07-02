const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    appartement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appartement',
        required:true
    },
    img:{
        type:String,
        required:true
    }
});
const image = mongoose.model('image',imageSchema);
module.exports = image;