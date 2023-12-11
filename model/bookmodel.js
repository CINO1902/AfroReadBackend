const mongoose = require('mongoose');
 const Schema = mongoose.Schema

 const bookupload = Schema({
    id:{
        type:Number
    },
    book_title :{
        type: String
    },
    author_name:{
        type:String
    }, 

    Review:{
        type:String,
        default:'5'
    },
    No_rated:{
        type:String,
        default:'100'
    },
    Preview:{
        type:String
    },
    link:{
        type:String
    },
    suitable_age:{
        type:String
    },
    added_by:{
        type:String
    },
    image_url:{
        type:String
    },
    Genre:{
        type:String
    }
 })

 module.exports = mongoose.model('books', bookupload)