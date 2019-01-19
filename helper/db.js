const mongoose = require('mongoose');

module.exports = ()  =>{
    mongoose.connect('mongodb://admin:zeynep2018@ds257314.mlab.com:57314/movie-api',{ useNewUrlParser: true });

    mongoose.connection.on('open',() => {
        console.log('MongoDb Connected');
    });

    mongoose.connection.on('error',(err) => {
        console.log('MongoDb Error:',err);
    });

    mongoose.Promise = global.Promise;
};

