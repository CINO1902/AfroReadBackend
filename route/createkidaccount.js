const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const kidaccount = require('../model/kidaccount');
const { validateToken } = require("../jwt/middleware");

router.route('/createkidaccount').post(validateToken, async (req,res, next)=>{
  const {fullname, Date_of_birth, username} = req.body;
  let email = req.decoded.email

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
           fullname: fullname,
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
    const username = req.query.username.trim();

     try{
         let getid =  await kidaccount.find({Username: username});
         if(getid.length != 0 || username == 'Caleb'){
      
           return res.json({status:"fail", msg:"User Already Exist"})
         }else{     
            return res.json({status:"success", msg:"is available"}) 
         }
       }catch(err){
         console.error(err)
          return res.json({status:"fail", msg:"something went wrong"})
       }
  })

  router.route('/fetchchildprofile').post(validateToken, async (req,res)=>{
    let email = req.decoded.email

     try{
         let getid =  await kidaccount.find({parent_email: email});
         if(getid.length == 0){
      
           return res.json({status:"2", msg:"Account Empty"})
         }else{     
            return res.json({status:"1", msg:getid}) 
         }
       }catch(err){
         console.error(err)
          return res.json({status:"3", msg:"something went wrong"})
       }
  })
module.exports = router