const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const indexRouter = require('./routes/index');
const adminRouter = require('./components/admins/router/adminRouter');
const skillRouter = require('./components/skills/router/skillRouter');
const levelRouter = require('./components/levels/router/levelRouter');
const levelEducationRouter = require('./components/level-education/router/levelEducationRouter');
const userRouter = require('./components/users/router/userRouter');
const locationRouter = require('./components/locations/router/locationRouter');
const contractRouter = require('./components/contracts/router/contractRouter');
const complainRouter = require('./components/complain/router/complainRouter');
const chatRouter = require('./components/chat/router/chatRouter');

require('./components/utils/authentication/passport');
const dbInfo = require('./components/utils/const/constant');

const uri = dbInfo.CONNECTION_STRING;
const app = express();
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/level', levelRouter);
app.use('/level-education', levelEducationRouter);
app.use('/location', locationRouter);
app.use('/skill', skillRouter);
app.use('/users', userRouter);
app.use('/contract', contractRouter);
app.use('/complain', complainRouter);
app.use('/chat', chatRouter);

app.get('/me', passport.authenticate('jwt'), (req, res, next) => {
  res.send({
    info: req.user.user
  });
});
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