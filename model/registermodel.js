const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const unregistered = Schema({
    fullname:{
        type:String
    },
    email:{
        type: String
    },
    password:{
        type:String
    },
    date_of_birth_day:{
         type:String
    },
    date_of_birth_month:{
         type:String
    },
    date_of_birth_year:{
         type:String
    },
    Security_question:{
         type:String
    },
     Security_answer:{
         type:String
    },
    token:{
        type:String
    },
    date:{
        type:Date
    }
})

module.exports = mongoose.model('unregistered', unregistered);