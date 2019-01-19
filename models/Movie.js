const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({

    //director_id :Schema.types.ObjectId,
    title : {
        type:String,
        required:true,
    },
    category:String,
    year:Number,
    imdb_point:Number,
    country:String,
    createdAt:{
        type:Date,
        default:Date.now

    }
});

module.exports = mongoose.model('movie',MovieSchema);