const mongoose = require('mongoose');
 const Schema = mongoose.Schema

 const search = Schema({
    token:{
        type:Number
    },
    search_query :{
        type: String
    },

 })

 module.exports = mongoose.model('search', search)