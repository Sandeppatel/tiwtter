const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    name : String ,
    username : String ,
    password : String ,
    posts : {
        type : Array ,
        default : [] ,
    }
})

const user = mongoose.model('user' , userSchema);
module.exports = user;