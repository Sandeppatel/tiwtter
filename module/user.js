const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type :String ,
        required : true ,
        unique : true ,
        trim : true ,
    },
    email : {
        type : String ,
        unique : true ,
       trim : true ,
    },
    possword : {
        type : String ,
        required : true ,
    },
    posts : {
        type : Array ,
        default : [] 
    }
} , {timestamps : true});

const user  = mongoose.model('user'  , userSchema);

module.exports = user ;