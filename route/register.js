const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const register = require('../model/registermodel')
const {createTokens, validateToken} = require('../jwt/middleware')
router.route('/createaccount').post(async (req,res)=>{
  const {fullname, email, password, date_of_birth, Security_Question, Security_ans} = req.body;
  let emailuse = email.toLowerCase().trim();
   let date = new Date();
   let date_of_birth_year = date_of_birth.split('-')[0]
   let date_of_birth_month = date_of_birth.split('-')[1]
   let date_of_birth_day = date_of_birth.split('-')[2]
   try{
       let getid =  await register.find({email: emailuse});
       if(getid.length != 0){
    
         return res.json({status:"fail", msg:"User Already Exist"})
       }else{
           const accessToken = createTokens(email)
           
        let hashpassword = await bcrypt.hash(password,10)
         await register.create({
             fullname: fullname,
             email: emailuse, 
             password:hashpassword,
             token:accessToken,
             date_of_birth_day:date_of_birth_day,
             date_of_birth_month:date_of_birth_month,
             date_of_birth_year:date_of_birth_year,
             Security_question:Security_Question,
             Security_answer:Security_ans,
             date:date    
         }).then( async()=>{ 
           return  res.json({status:"success", msg:"Dashboard Created", token:accessToken})
         }).catch((err)=>{
             if(err){
               console.error(err)
               return  res.json({status:"fail", msg:"something went wrong"})
             }
         })
       }
     }catch(err){
       console.error(err)
        return res.json({status:"fail", msg:"something went wrong"})
     }
})

module.exports = router