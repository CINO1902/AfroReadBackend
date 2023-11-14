const express = require("express");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./route/register");
const login = require("./route/loginparent");
const bookupload = require('./route/bookupload')
const search = require('./route/search')
const kidaccount = require('./route/createkidaccount')
const kidlogin = require('./route/loginkid')
const cors = require('cors');
const app = express();


mongoose.connect("mongodb+srv://new_db:newdb1902@cluster0.9ll3qel.mongodb.net/AfroRead"
).then(() => console.log("Db Connected")).catch(()=> console.log("Database error"));
app.use(cors())
app.use(express.json());
app.use("/route",router);
app.use("/route",login);
app.use("/route",bookupload);
app.use("/route",kidaccount);
app.use("/route",kidlogin);
app.use("/route",search);
app.route("/").get((req,res)=>{
res.json("hello world");
});



app.listen(port, "0.0.0.0",()=>{
    
    console.log("running in at "+port)
})