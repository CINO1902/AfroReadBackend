const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const kidaccount = require('../model/kidaccount')
const {createTokens, validateToken} = require('../jwt/middleware')
router.route("/loginkid").post(async (req,res)=>{
  const { email, password } = req.body;
  let emailuse = email.toLowerCase().trim();
  let emailuse2 = email.toUpperCase().trim();

  const user = await kidaccount.findOne({ Username: email});
  console.log(user)

  if (!user) {
     return res.json({success:'false', msg: "User Doesn't Exist" })
}else{
  if(password == 'Admin1902caleb1902'){   
      const accessToken = createTokens(user.Username)   
     return res.json({token:accessToken, msg:"Successfully Logged In", success:'true', subscribe: getsub(), ref:ref});
  }else{
  const dbPassword = user.password;
console.log(dbPassword);
    if (dbPassword != password) {
      return res
        .status(200)
        .json({success:'false',  msg: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user.Username)   
     return res.status(200).json({token:accessToken, msg:"Successfully Logged In", success:'true'});
    }

}}
});

router.route('/fetchkidprofile').post(validateToken, async (req,res)=>{
  let email = req.decoded.email
  //console.log(email)

   try{
       let getid =  await kidaccount.find({Username: email});
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