const express = require("express");
const router = express.Router();
const register = require('../model/registermodel')
const {createTokens, validateToken} = require('../jwt/middleware')
router.route('/createunregistered').post(async (req,res)=>{
   const {name, email} = req.body;

    let date = new Date();
 
    try{
        let getid =  await register.find({email: email});
        if(getid.length != 0){
     
          return res.json({status:"fail", msg:"User Already Exist"})
        }else{
            const accessToken = createTokens(email)
          await register.create({
              name: name,
              email: email, 
              token:accessToken,
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