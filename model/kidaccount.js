const mongoose = require('mongoose');
 const Schema = mongoose.Schema

 const kidaccount = Schema({
    Name :{
        type: String
    },
    Date_of_birth:{
        type:String
    }, 
    Username:{
        type:String
    },
    parent_email:{
        type:String
    },
    password:{
        type:String
    },
    Restriction_mode:{
        type:Boolean
    },
    allowed_book_age:{
        type:String
    },
    unsuitable_genres:{
        type:String
    } ,
    reading_level:{
        type:String
    },  
    custom_time:{
        type:Boolean
    },
    gentime:{
        type:Number
    },
    time: [
		{
			'Monday':  Number,
			'Tuesday': Number,
			'Wednesday': Number,
			'Thursday': Number,
			'Friday': Number,
			'Saturday': Number,
            'Sunday': Number,
		}
	],
 });

 module.exports = mongoose.model('kidaccount', kidaccount)