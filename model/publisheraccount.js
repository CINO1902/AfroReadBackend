const mongoose = require('mongoose');
 const Schema = mongoose.Schema

 const pubisheraccount = Schema({
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

 module.exports = mongoose.model('pubisheraccount', pubisheraccount)