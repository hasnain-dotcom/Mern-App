var createError = require('http-errors');
var express = require('express');
const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const expressSession = require('express-session');
const passport = require("passport");
const flash = require('express-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signUpRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var addpostRouter = require('./routes/addPost');

var app = express();
var mongoose = require("mongoose");
require('./routes/passport')(passport);
var mongoDB = 'mongodb://127.0.0.1:27017/admin';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use( flash() )

/*app.use( cors({
  origin: ['http://localhost:3000', 'http://localhost:9001'],
  credentials: true
}))*/
app.use( session({
 secret: 'secret',       
 resave: true,
 saveUninitialized: true,
 cookie: {domain: 'http://localhost:3000/'}
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/addPost', addpostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
