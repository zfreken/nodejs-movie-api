const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({

    director_id :Schema.Types.ObjectId,
    title : {
        type:String,
        required:[true,'Bu alan ({PATH}) zorunludur.'],
        maxlength:30,
        minlength: 2

    },
    category: {
        type:String,
        maxlength:20,
        minlength: 1
    },
    year:{
        type:Number,
        max:2030,
        min:1975
    },
    imdb_point:Number,
    country:{
        type:String,
        maxlength:20,
        minlength: 1
    },
    createdAt:{
        type:Date,
        default:Date.now

    }
});

module.exports = mongoose.model('movie',MovieSchema);