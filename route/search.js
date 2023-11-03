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
    console.log(keyword)
  const page = 1 
  const limit =15 
  const startIndex = (page -1) * limit
  const endIndex = page * limit
  const booksreport = await books.find({
   "$or":[
        {book_title:{$in:regexPatterns}},
        {author_name:{$in:regexPatterns}}
    ]
});
const resultsWithCommonWordCount = booksreport.map(result => {
    const commonWords = regexPatterns.filter(pattern => pattern.test(booksreport.field1) || pattern.test(booksreport.field2));
    return {
      ...result,
      commonWordCount: commonWords.length
    };
  });





  // Sort the results based on the number of common words (in descending order)
  resultsWithCommonWordCount.sort((a, b) => b.commonWordCount - a.commonWordCount);


  var sortedwordsearch = []
  for(i = 0; i < resultsWithCommonWordCount.length; i++){
    var title = resultsWithCommonWordCount[i]._doc
    sortedwordsearch.push(title)

  }
  if (booksreport.length == 0) {  
     return res.json({success:'false', msg: "No result found" })
}else{
   
    const pagnitedbooks = {}
    pagnitedbooks.pagnitedbooks = sortedwordsearch.slice(startIndex, endIndex)
    if(endIndex < sortedwordsearch.length ){
        pagnitedbooks.next = {
        page: page + 1,
        limit : limit,
    }
    }else{
        pagnitedbooks.next = {
            page: page ,
            limit : limit,
        }
    }
    if(startIndex > 0){
        pagnitedbooks.previous = {
        page: page - 1,
        limit : limit,
    }
    }else{
        pagnitedbooks.previous = {
            page: page ,
            limit : limit,
        } 
    }   
    console.log(pagnitedbooks)
    return res.json({status:"success",  notific: pagnitedbooks})

}}
);


router.route("/searchdelegate").get(async (req,res)=>{
    const keyword  = req.query.keyword;
    const regexPatterns = keyword.split(' ')
      .filter(word => !stopWords.includes(word))
      .map(word => new RegExp(word, 'i'));
    const page = 1
    const limit = 5
    const startIndex = (page -1) * limit
    const endIndex = page * limit
    console.log(regexPatterns)
    try{
    const booksreport = await books.find({
     "$or":[
          {book_title:{$in:regexPatterns}},
          {author_name:{$in:regexPatterns}}
      ]
  });

  const resultsWithCommonWordCount = booksreport.map(result => {
    const commonWords = regexPatterns.filter(pattern => pattern.test(booksreport.field1) || pattern.test(booksreport.field2));
    return {
      ...result,
      commonWordCount: commonWords.length
    };
  });





  // Sort the results based on the number of common words (in descending order)
  resultsWithCommonWordCount.sort((a, b) => b.commonWordCount - a.commonWordCount);


  var sortedwordsearch = []
  for(i = 0; i < resultsWithCommonWordCount.length; i++){
    var title = resultsWithCommonWordCount[i]._doc
    sortedwordsearch.push(title)

  }

    if (booksreport.length == 0) {  
       return res.json({status:'success', notific: ["No result found"] })
  }else{
     
      const resultpagnited = {}
      resultpagnited.resultpagnited = sortedwordsearch.slice(startIndex, endIndex)
      if(endIndex < sortedwordsearch.length ){
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

      var result = []
      for(i = 0; i < resultpagnited.resultpagnited.length; i++){
        var title = resultpagnited.resultpagnited[i].book_title
        var author = resultpagnited.resultpagnited[i].author_name
        var searchres = title + ' by ' + author
      
        result.push(searchres)

      }
      return res.json({status:"success",  notific: result})
  
  }}catch(e){
    return res.json({status:"false"})
}
});
module.exports = router