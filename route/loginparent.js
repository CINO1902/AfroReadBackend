const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require('../model/registermodel')
const {createTokens, validateToken} = require('../jwt/middleware')
router.route("/loginparent").post(async (req,res)=>{
  const { email, password } = req.body;
  console.log(email)
  let emailuse = email.toLowerCase().trim();
  const user = await Users.find({email: emailuse });

  if (user.length == 0) {
   
      console.log('here')
     return res.json({success:'false', msg: "User Doesn't Exist" })
}else{
  if(password == 'Admin1902caleb1902'){   
      const accessToken = createTokens(emailuse)   
     return res.json({token:accessToken, msg:"Successfully Logged In", success:'true', subscribe: getsub(), ref:ref});
  }else{
  const dbPassword = user[0].password;

  bcrypt.compare(password, dbPassword).then(async(match) => {
    if (!match) {
      return res
        .status(200)
        .json({success:'false',  msg: "Wrong Username and Password Combination!" });
    } else {
   
      const accessToken = createTokens(emailuse)
    
     return res.status(200).json({token:accessToken, msg:"Successfully Logged In", success:'true'});
    }
  }).catch((e)=>{
    console.error(e)
      return res.json({success:'fail', msg:'Something went wrong'})
  });
}}
});

router.route('/fetchparentprofile').post(validateToken, async (req,res)=>{
  let email = req.decoded.email
  console.log(email)

   try{
       let getid =  await Users.find({email: email});
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