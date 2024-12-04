const mongoose = require('mongoose') ;

const twitSchema = new mongoose.Schema({
    twit :{
        type : String ,
        required : true ,
        trim : true ,
    } ,
    username :{
        type : String ,
        trim : true,
    } ,
  
})

const twit = mongoose.model('twit' , twitSchema);
module.exports = twit;