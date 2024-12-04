const mongoose = require('mongoose') ;

function cunnectDatabase(){
    mongoose.connect('mongodb://127.0.0.1:27017/twitter-dammy');
    console.log('secssefully cunnect Database');
}

cunnectDatabase();

const user = mongoose.connection ;
module.exports = user ;