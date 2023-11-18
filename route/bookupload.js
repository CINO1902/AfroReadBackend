const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const books = require('../model/bookmodel')

// const books = require('./epub/alcott.epub')
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import multer from "multer";

// const firebaseConfig = {
//   apiKey: "AIzaSyDHOq1I23ZJDzvPFKOxl8tRZT5bDF4bPDg",
//   authDomain: "afroread.firebaseapp.com",
//   databaseURL: "https://afroread-default-rtdb.firebaseio.com",
//   projectId: "afroread",
//   storageBucket: "afroread.appspot.com",
//   messagingSenderId: "238742498075",
//   appId: "1:238742498075:web:2aff1666bc83f9019441be",
//   measurementId: "G-WPYPMMV2FR"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const storage = getStorage();

// // Setting up multer as a middleware to grab photo uploads
// const upload = multer({ storage: multer.memoryStorage() });
cloudinary.config({ 
  cloud_name: 'dlsavisdq', 
  api_key: '195525497716576', 
  api_secret: process.env.API_SECRET 
});
router.route('/uploadbooks').post(async (req,res)=>{
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
  //  await cloudinary.api.create_upload_preset({
  //     name: 'book_preset3',
   
  //     folder: 'afroread/book',
  //     allowed_formats: 'epub, EPUB, Electronic Publication (EPUB)'
  //   })
  //   .then(uploadResult => console.log(uploadResult))
  //   .catch(error => console.error(error));

    // const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_BdyMqDTxUoVnBlvvHzUVg4G7S6Zgi8_VqzMEK7tAhtK7_SVTnrb8WKTiga4m_BFGmcc&usqp=CAU';

    // const bookurl = 'https://res.cloudinary.com/dlsavisdq/raw/upload/v1696079128/afroread/books/chesterton-orthodoxy_iztkcw.epub'
    //  await cloudinary.uploader.upload(image_url,{
    //     upload_preset: 'image_preset'
    //   }).catch((e)=>{
    //     console.error(e)
    //     return res.json({msg:e.message, status:'false'})
    //   }).then( async(resultimage)=>{
    //         await cloudinary.uploader.upload("./epub/alcott.epub",{
    //       upload_preset: 'book_preset',
    //        resource_type: "raw" 
    //     }).catch((e)=>{
    //       console.error(e)
    //       return res.json({msg:e.message, status:'false'})
    //     }).then((resultbook)=>{
    //       console.log(resultimage.secure_url)
    //       console.log(resultbook.secure_url)
        books.create({
          id:createbooknumber(12),
          book_title:book_title,
          author_name:author_name,
          Review:Review,
          No_rated:No_rated,
          Preview:Preview,
          link:link,
          added_by:added_by,
          image_url:image_url,
          Genre:genre,
      })
      return res.json({msg:'Successfully Added', status:'true'})
      // })
    // })
  }catch(e){
    console.error(e)
    return res.json({msg:'Something went wrong', status:'false'})
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

module.exports = router