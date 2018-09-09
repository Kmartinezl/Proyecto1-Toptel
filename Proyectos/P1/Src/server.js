const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//const { url } = require('./Config/database');

//conexión a la base de datos
/**mongoose.connect(url, {
  useMongoClient: true
});**/

//require('./Config/passport')(passport);

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'Views'));
app.set('views engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret:'alvnomefunciona',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
require('./app/routes')(app, passport);

//Static files
app.use(express.static(path.join(__dirname, 'Public')));

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
