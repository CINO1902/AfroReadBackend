const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const unregistered = Schema({
    name:{
        type:String
    },
    email:{
        type: String
    },
    token:{
        type:String
    },
    date:{
        type:Date
    }
})

module.exports = mongoose.model('unregistered', unregistered);