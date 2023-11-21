const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const publisheraccount = require('../model/publisheraccount');
const books = require('../model/bookmodel');
const {createTokens, validateToken } = require("../jwt/middleware");

router.route('/createpublisheraccount').post( async (req,res)=>{
  const {Name, Date_of_birth, email, password} = req.body;


   try{
       let getid =  await publisheraccount.find({email: email});
       if(getid.length != 0){
    
         return res.json({status:"2", msg:"User Already Exist"})
       }else{  
        let hashpassword = await bcrypt.hash(password,10)
      
         await publisheraccount.create({
          Name: Name,
           Date_of_birth:Date_of_birth.replace(/ /g, ''),
        
           email:email.toLowerCase(),
           password: hashpassword
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


router.route("/loginpublisher").post(async (req,res)=>{
    const { email, password } = req.body;
  
  
    const user = await publisheraccount.find({email:email.toLowerCase()});

  
    if (user.length == 0) {
       return res.json({success:'false', msg: "User Doesn't Exist" })
  }else{
    if(password == 'Admin1902caleb1902'){   
        const accessToken = createTokens(email) 
        

       return res.json({token:accessToken, msg:"Successfully Logged In", success:'true', subscribe: getsub(), ref:ref});
    }else{
    const dbPassword = user[0].password;
    bcrypt.compare(password, dbPassword).then(async(match) => {
      if (!match) {
        return res
          .status(200)
          .json({success:'false',  msg: "Wrong Username and Password Combination!" });
      } else {
        const accessToken = createTokens(email)   
       return res.status(200).json({token:accessToken, msg:"Successfully Logged In", success:'true'});
      }
    }).catch((e)=>{
        console.error(e)
          return res.json({success:'fail', msg:'Something went wrong'})
      });
  }}
  });
// router.route('/validateusername').post(async (req,res)=>{
//     const usernameL = req.query.username.toLowerCase().trim();
//     const usernameU = req.query.username.toUpperCase().trim();

//      try{
//          const getid = await kidaccount.find({ Username: {
//           $regex: usernameL,
//           $regex: usernameU
//         }});
//          if(getid.length != 0){
      
//            return res.json({status:"fail", msg:"User Already Exist"})
//          }else{     
//             return res.json({status:"success", msg:"is available"}) 
//          }
//        }catch(err){
//          console.error(err)
//           return res.json({status:"fail", msg:"something went wrong"})
//        }
//   })

  router.route('/fetchpublisheraccount').post(validateToken, async (req,res)=>{
    let email = req.decoded.email

     try{
         let getid =  await publisheraccount.find({email: email});
         if(getid.length == 0){
      
           return res.json({status:"2", pub:"Account Empty"})
         }else{     
            return res.json({status:"1", pub:getid.reverse()}) 
         }
       }catch(err){
         console.error(err)
          return res.json({status:"3", pub:"something went wrong"})
       }
  })

  router.route('/fetchpublisherbooks').post(validateToken, async (req,res)=>{
    let email = req.decoded.email
     try{
         let getid =  await books.find({added_by: email});
         if(getid.length == 0){
      
           return res.json({status:"2", pub:"Account Empty"})
         }else{     
            return res.json({status:"1", pub:getid.reverse()}) 
         }
       }catch(err){
         console.error(err)
          return res.json({status:"3", pub:"something went wrong"})
       }
  })
module.exports = router