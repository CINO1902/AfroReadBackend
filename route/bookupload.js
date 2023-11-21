const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const books = require('../model/bookmodel')
const { validateToken } = require("../jwt/middleware");
// const books = require('./epub/alcott.epub')
require('dotenv').config();


router.route('/uploadbooks').post(validateToken, async (req,res)=>{
  const email = req.decoded.email
    const {book_title, author_name, Review, No_rated, Preview,link, added_by, image_url,genre} = req.body;

    function createbooknumber(length){ 
        function makeid(length) {
            var result           = '';
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }     
                    return makeid(length);
  }
  try{
    function getpub(){
      let pubsend = '';
      if(email == 'caleboruta.co@gmail.com'){
        pubsend = 'Admin'
      }else{
        pubsend = email;
      }
return pubsend
    }
  
        books.create({
          id:createbooknumber(12),
          book_title:book_title,
          author_name:author_name,
          Preview:Preview,
          link:link,
          added_by:getpub(),
          image_url:image_url,
          Genre:genre,
      })
      return res.json({msg:'Successfully Added', status:'1'})
      // })
    // })
  }catch(e){
    console.error(e)
    return res.json({msg:'Something went wrong', status:'2'})
  }

})



router.route('/call_books').post(async (req,res)=>{
  const page = parseInt(req.query.page) 
  const limit = parseInt(req.query.limit) 
  const startIndex = (page -1) * limit
  const endIndex = page * limit
try{
  let getbooks = await books.find()

  const pagnitedbooks = {}
  pagnitedbooks.pagnitedbooks = getbooks.reverse().slice(startIndex, endIndex)
 
  if(endIndex < getbooks.length ){
    pagnitedbooks.next = {
      page: page + 1,
      limit : limit,
  }
  }else{
    pagnitedbooks.next = {
          page: page ,
          limit : limit,
      }
  }
  if(startIndex > 0){
    pagnitedbooks.previous = {
      page: page - 1,
      limit : limit,
  }
  }else{
    pagnitedbooks.previous = {
          page: page ,
          limit : limit,
      } 
  }   
  return res.json({status:"success",  notific: pagnitedbooks})
 
}catch(e){
  console.error(e)
  return res.json({status:'false'})
}

})


router.route('/call_my_books').post(validateToken, async (req,res)=>{
  const email = req.decoded.email

  const page = parseInt(req.query.page) 
  const limit = parseInt(req.query.limit) 
  const startIndex = (page -1) * limit
  const endIndex = page * limit

  function getpub(){
    let pubsend = '';
    if(email == 'caleboruta.co@gmail.com'){
      pubsend = 'Admin'
    }else{
      pubsend = email;
    }
    return pubsend;
  }
try{
  let getbooks = await books.find({added_by:getpub()})
console.log(getbooks);
  const pagnitedbooks = {}
  pagnitedbooks.pagnitedbooks = getbooks.reverse().slice(startIndex, endIndex)
 
  if(endIndex < getbooks.length ){
    pagnitedbooks.next = {
      page: page + 1,
      limit : limit,
  }
  }else{
    pagnitedbooks.next = {
          page: page ,
          limit : limit,
      }
  }
  if(startIndex > 0){
    pagnitedbooks.previous = {
      page: page - 1,
      limit : limit,
  }
  }else{
    pagnitedbooks.previous = {
          page: page ,
          limit : limit,
      } 
  }   
  return res.json({status:"success",  notific: pagnitedbooks})
 
}catch(e){
  console.error(e)
  return res.json({status:'false'})
}

})

module.exports = router