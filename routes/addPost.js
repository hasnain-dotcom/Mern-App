var express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var addPost = require("../Schema/createPost_schema");
const { ensureAuthenticated } = require('./auth');
var mongoDB = 'mongodb://127.0.0.1:27017/admin';
var jwt = require('jsonwebtoken');

mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;


//Set up default mongoose connection


router.get('/',verifyToken, function(req, res, next) {
  var bearerHeader= req.headers["authorization"];
  var token = JSON.parse(bearerHeader).token
  
  jwt.verify(token,'secret',(err,authData)=>{
    if(err){
     res.sendStatus(404);
     return;
    }
    else{

      db.collection("postschemas").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });
    }
  })

        
});
function verifyToken(req,res,next){
  
 const bearerHeader = req.headers["authorization"];
 if(typeof bearerHeader !== 'undefined')
 {
   const bearer = bearerHeader.split(' ');
   const bearerToken = bearer[1];
   req.token = bearerToken;
   next();
 }
 else{
  console.log("in error");
  res.sendStatus(403);
 }
}
router.post('/', function(req, res, next) {
        console.log("into add Post");
        var records = new addPost({title: req.body.title , body: req.body.body});
        records.save(function(err){
           if(err){console.log(err);}
           else{console.log("success")}
         })
         res.send(true);
         return;
  /*  MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology: true}, function (err, client) {
  if (err) throw err

 var db = client.db('admin')
var checkUser = db.collection('user').find( { "Email": "muneebahmad121@gmail.com" } );
console.log(checkUser);*/
/*
db.collection('user').insertOne(myobj,function (err, result) {
 if (err) throw err

 console.log(result)
})

})*/    
});
 router.delete('/', verifyToken, (req, res) => {
  var bearerHeader= req.headers["authorization"];
  var token = JSON.parse(bearerHeader).token
  
  jwt.verify(token,'secret',(err,authData)=>{
    if(err){
     res.sendStatus(404);
     return;
    }
    else{
      console.log("post deleted");
      res.send(true);
      return ;
    }
 
 });
});

module.exports = router;