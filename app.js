const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const usersRouter = require('./routes/users.js');
const walletRouter = require('./routes/wallet.js');

let app = express();

//load .env file
dotenv.load();

//mongo connection
mongoose.connect("mongodb://" + process.env.MONGO_ADDRESS + "/" + process.env.DATABASE, {
  useMongoClient: true
});

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

mongoose.connection.on('open', function() {
  console.log('mongo db is connected');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middle wares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.all('/wallet/*', [require('./validator/tokenValidator.js')]);
app.use('/wallet',walletRouter);

//base request
app.get("/",function(req,res) {
  res.send("koinok");
})

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

//for unexpected errors, comment the code because not the good method to stop the server when exception happens
//process.on('uncaughtException', function (err) {
//  console.log(err);
//});

module.exports = app;
