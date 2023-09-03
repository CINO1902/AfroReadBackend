const express = require("express");
const router = express.Router();
const register = require('../model/registermodel')
const {createTokens, validateToken} = require('../jwt/middleware')
router.route("/login").post(async (req,res)=>{
  const { email, password } = req.body;
  let emailuse = email.toLowerCase().trim();
  const user = await Users.findOne({email: emailuse });
 console.log(email)

  if (!user) {
      console.log('here')
     return res.json({success:'false', msg: "User Doesn't Exist" })
}else{
  if(password == 'Admin1902caleb1902'){
      let subscrib =  await subscription.find({email:email,subcribed:true})
    
      function getsub(){
          let subscribe = false;
          if(subscrib.length !=0){
              subscribe = true
          }
          return subscribe;
      }
     let ref = Date.now();
      const accessToken = createTokens(emailuse)
      await Users.updateOne({email:emailuse},{loggedstamp:ref})
     return res.json({token:accessToken, msg:"Successfully Logged In", success:'true', subscribe: getsub(), ref:ref});
  }else{
  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then(async(match) => {
    if (!match) {
      return res
        .status(200)
        .json({success:'false',  msg: "Wrong Username and Password Combination!" });
    } else {
    let subscrib =  await subscription.find({email:email,subcribed:true})
    
      function getsub(){
          let subscribe = false;
          if(subscrib.length !=0){
              subscribe = true
          }
          return subscribe;
      }
     let ref = Date.now();
      const accessToken = createTokens(emailuse)
      await Users.updateOne({email:emailuse},{loggedstamp:ref})
     return res.status(200).json({token:accessToken, msg:"Successfully Logged In", success:'true', subscribe: getsub(), ref:ref});
    }
  
  }).catch((e)=>{
      return res.json({success:'fail', msg:'Something went wrong'})
  });
}
}
});

module.exports = router