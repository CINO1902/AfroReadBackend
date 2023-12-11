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
    },
    Security_question:{
        type:String
   },
    Security_answer:{
        type:String
   },
   account_number:{
    type:String
   },
   bank:{
    type:String
   },
   
 });

 module.exports = mongoose.model('pubisheraccount', pubisheraccount)