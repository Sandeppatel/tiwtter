const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/twitter-dammy').then(()=>{
    console.log( ' cunnect to database ');
    
})

const configuser = mongoose.Connection ;
module.exports = configuser ;