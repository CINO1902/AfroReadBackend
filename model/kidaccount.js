const mongoose = require('mongoose');
 const Schema = mongoose.Schema

 const kidaccount = Schema({
    Name :{
        type: String
    },
    Date_of_birth:{
        type:String
    }, 
   email:{
        type:String
    },
    password:{
        type:String
    }
 });

 module.exports = mongoose.model('kidaccount', kidaccount)