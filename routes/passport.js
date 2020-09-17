const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/admin';

mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

// Load User model
const User = require('../Schema/signup_schema');

module.exports = function(passport) {
    
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      var query = {Email : email}
      db.collection("userschemas").findOne(query).then(user => {
        
        if (!user) {
            
          return done(null, false, { message: 'That email is not registered' });
        }
        
        // Match password
        bcrypt.compare(password, user.Password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.Email);
  });

  passport.deserializeUser(function(id, done) {
    console.log("this is my id"+id);
    var query = {Email : id}
    db.collection("userschemas").findOne(query, function(err, user) {
      done(err, user);
    });
  });
};