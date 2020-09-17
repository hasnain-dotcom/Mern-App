var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var signupSchema = require("../Schema/signup_schema");
const passport = require('passport');
var jwt = require('jsonwebtoken');
//Get the default connection


var mongoDB = 'mongodb://127.0.0.1:27017/admin';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;


//Set up default mongoose connection


router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  passport.authenticate('local', function(err, user, info) {
    if (err) { console.log(err); }
    if (!user) { res.send(false)
    return;
    }
    else{
     jwt.sign({user},"secret",(err,token)=>{
      res.json({token});
      return;
     })
      
    }
   /* req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log("user found");*/
})(req,res,next)
   /* var query = { Email: req.body.email};
    console.log(req.body);
    db.collection("userschemas").find(query).toArray(function(err, result) {
    if (err) {throw err;}
    else{console.log(result);}
    if(result.length !=0){
    if(result[0].Email == req.body.email && result[0].Password == req.body.password){
      res.send(true);
      return;
    }
    else{
     res.send(false);
     return;
    }
}
else {
    res.send(false);
     return;
}
  });*/

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