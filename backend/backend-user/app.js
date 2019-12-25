const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const formData = require('express-form-data');
const cloudinary = require('cloudinary').v2;
const indexRouter = require('./routes/index');
const usersRouter = require('./components/users/router/userRouter');
const chatRouter = require('./components/chat/router/chatRouter');
const transactionRouter = require('./components/transactions/router/transactionRouter');
const contractRouter = require('./components/contract/router/contractRouter');
const complainRouter = require('./components/complain/router/complainRouter');

const dbInfo = require('./components/utils/const/constant');
require('./components/utils/authentication/passport');

const app = express();
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use(formData.parse());


app.use(passport.initialize());

const uri = dbInfo.CONNECTION_STRING;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('database connected');
});

cloudinary.config({
  cloud_name: 'dc4rxxjyt',
  api_key: '182393896791142',
  api_secret: 'g95hnkYtxrJWTGY0FfSDs0yms5w'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat', passport.authenticate('jwt', {
  session: false
}), chatRouter);
app.use('/users', usersRouter);
app.use('/transaction', transactionRouter);
app.use('/contract', contractRouter);
app.use('/complain', complainRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;