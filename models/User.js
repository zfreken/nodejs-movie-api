const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username:{
        type: String,
        maxlength:30,
        minlength:1,
        required:true,
        unique:true
    },
    password:{
        type: String,
        maxlength:60,
        minlength:6
    }
});

module.exports = mongoose.model('user',UserSchema);