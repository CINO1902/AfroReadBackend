const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const books = require('../model/bookmodel')
const stopWords = ['the', 'and', 'or', 'but', 'not', 'is', 'to', 'in', 'by'];
router.route("/search").get(async (req,res)=>{
  const keyword  = req.query.keyword;
  const regexPatterns = keyword.split(' ')
    .filter(word => !stopWords.includes(word))
    .map(word => new RegExp(word, 'i'));
  const page = parseInt(req.query.page) 
  const limit = parseInt(req.query.limit) 
  const startIndex = (page -1) * limit
  const endIndex = page * limit
  const booksreport = await books.find({
   "$or":[
        {book_title:{$in:regexPatterns}},
        {author_name:{$in:regexPatterns}}
    ]
});
console.log(booksreport)
  if (booksreport.length == 0) {  
     return res.json({success:'false', msg: "No result found" })
}else{
   
    const resultpagnited = {}
    resultpagnited.resultpagnited = booksreport.reverse().slice(startIndex, endIndex)
    if(endIndex < booksreport.length ){
        resultpagnited.next = {
        page: page + 1,
        limit : limit,
    }
    }else{
        resultpagnited.next = {
            page: page ,
            limit : limit,
        }
    }
    if(startIndex > 0){
        resultpagnited.previous = {
        page: page - 1,
        limit : limit,
    }
    }else{
        resultpagnited.previous = {
            page: page ,
            limit : limit,
        } 
    }   
    return res.json({status:"success",  notific: resultpagnited})

}}
);

module.exports = router