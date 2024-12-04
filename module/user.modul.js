const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    name : String ,
    username: { type: String, required: true },
    password: { type: String, required: true },
    posts : {
        type : Array ,
        default : [] ,
    }
})

const user = mongoose.model('user' , userSchema);
module.exports = user;