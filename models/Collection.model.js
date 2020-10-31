const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({

    
    name:{
       type:String,
       required:[true,'Collection name is required'],
       unique: [1,'Prouduct name must be unique'],
       maxlength: 100
    },
    
    images:{
        type: String,
        default:'noimage.jpg'
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Collection',collectionSchema);

