const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const kidaccount = require('../model/kidaccount');
const { validateToken } = require("../jwt/middleware");

router.route('/createkidaccount').post(validateToken, async (req,res, next)=>{
  const {fullname, Date_of_birth, username} = req.body;
  let email = req.decoded.email
  console.log(email)

   try{
       let getid =  await kidaccount.find({Username: username});
       if(getid.length != 0){
    
         return res.json({status:"2", msg:"User Already Exist"})
       }else{  
     
           function createpassword(length){ 
            function makeid(length) {
                var result           = '';
                var characters       = '0123456789ABCDEFGHIJKLMNIOQRSTUVWXYZ';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }     
                        return makeid(length);
      }
         await kidaccount.create({
          Name: fullname,
           Date_of_birth:Date_of_birth.replace(/ /g, ''),
           Username:username,
           parent_email:email,
           password: createpassword(6)
         }).then( async()=>{ 
           return  res.json({status:"1", msg:"Dashboard Created"})
         }).catch((err)=>{
             if(err){
               console.error(err)
               return  res.json({status:"3", msg:"something went wrong"})
             }
         })
       }
     }catch(err){
       console.error(err)
        return res.json({status:"fail", msg:"something went wrong"})
     }
})



router.route('/validateusername').post(async (req,res)=>{
    const usernameL = req.query.username.toLowerCase().trim();
    const usernameU = req.query.username.toUpperCase().trim();

     try{
         const getid = await kidaccount.find({ Username: {
          $regex: usernameL,
          $regex: usernameU
        }});
         if(getid.length != 0){
      
           return res.json({status:"fail", msg:"User Already Exist"})
         }else{     
            return res.json({status:"success", msg:"is available"}) 
         }
       }catch(err){
         console.error(err)
          return res.json({status:"fail", msg:"something went wrong"})
       }
  })

  router.route('/edit_kid').post(async (req,res)=>{
    try{
      let getkid = await kidaccount.find()
    
    for(let i= 0; i< getkid.length; i++ ){
      console.log(getkid[i].Username)
     await kidaccount.updateOne(
        {Username:getkid[i].Username},
        { $set: { allowed_book_age: '14-17'}},{upsert:true})
    }
    
     
      
      return res.json({status:"success"  })
     
    }catch(e){
      console.error(e)
      return res.json({status:'false'})
    }
  })

  router.route('/change_kid_age').post(async (req,res)=>{
    const {book_age} = req.body
    try{
      let getkid = await kidaccount.find()
    
    for(let i= 0; i< getkid.length; i++ ){
      console.log(getkid[i].Username)
     await kidaccount.updateOne(
        {Username:getkid[i].Username},
        { $set: { allowed_book_age: book_age}},{upsert:true})
    } 
      return res.json({status:"success"  })
     
    }catch(e){
      console.error(e)
      return res.json({status:'false'})
    }
  })


  router.route('/set_restriction_mode').post(async (req,res)=>{
    const {restrict, age,username} = req.body
  
    try{
     await kidaccount.updateOne(
        {Username:username},
        { $set: { Restriction_mode: restrict, allowed_book_age:age}},{upsert:true})
    
      return res.json({status:"1"  })
     
    }catch(e){
      console.error(e)
      return res.json({status:'2'})
    }
  })



  router.route('/set_unsuitable_genres').post(async (req,res)=>{
    const {restrict, age,username} = req.body
  
    try{
     await kidaccount.updateOne(
        {Username:username},
        { $set: { Restriction_mode: restrict, unsuitable_genres:age}},{upsert:true})
    
      return res.json({status:"1"  })
     
    }catch(e){
      console.error(e)
      return res.json({status:'2'})
    }
  })
  router.route('/set_reading_level').post(async (req,res)=>{
    const {restrict, age,username} = req.body
  
    try{
     await kidaccount.updateOne(
        {Username:username},
        { $set: { Restriction_mode: restrict, reading_level:age}},{upsert:true})
    
      return res.json({status:"1"  })
     
    }catch(e){
      console.error(e)
      return res.json({status:'2'})
    }
  })
  router.route('/change_time_limit').post(async (req,res)=>{
    const {custom, time , gentime, username} = req.body
    try{
     await kidaccount.updateOne(
        {Username:username},
        { $set: { custom_time: custom, time:time, gentime:gentime}},{upsert:true})
    
      return res.json({status:"1"  })
     
    }catch(e){
      console.error(e)
      return res.json({status:'2'})
    }
  })
  router.route('/fetchchildprofile').post(validateToken, async (req,res)=>{
    let email = req.decoded.email

     try{
         let getid =  await kidaccount.find({parent_email: email});
         if(getid.length == 0){
      
           return res.json({status:"2", msg:"Account Empty"})
         }else{     
            return res.json({status:"1", msg:getid.reverse()}) 
         }
       }catch(err){
         console.error(err)
          return res.json({status:"3", msg:"something went wrong"})
       }
  })
module.exports = router