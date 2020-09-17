var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var signupSchema = require("../Schema/signup_schema");
var mongoDB = 'mongodb://127.0.0.1:27017/admin';
const bcrypt = require('bcryptjs');

mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;


//Set up default mongoose connection


router.get('/', function(req, res, next) {
    console.log("HEllo get api");
    res.send('API is working properly');
});

router.post('/', function(req, res, next) {
    var query = { Email: req.body.email };
    db.collection("userschemas").find(query).toArray(function(err, result) {
    if (err) {throw err;}
    else{console.log("Eroro");}
    if(result.length !== 0){
    if(result[0].Email == req.body.email){
      res.send(false);
      return;
    }
  }
    else{
      
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        var records = new signupSchema({firstName: req.body.firstName , lastName: req.body.lastName,
          Email: req.body.email, Password: hash});
          records.save(function(err){
             if(err){console.log(err);}
             else{console.log("success")}
           })
           res.send(true);
           return;
       });
       
    }
  
    
  });

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

module.exports = router;