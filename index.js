const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config()
var bodyParser = require( 'body-parser' );
const passport = require('passport')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));

database.once('connected', function() {
  console.log("Connected to MongoDB")
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cookieParser());

app.use(session({secret: process.env.CLIENT_SECRET, resave: true, saveUninitialized: true}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use('/api', require('./routes/user.js'));
app.use('/api', require('./routes/illness.js'));
app.use('/api', require('./routes/workout.js'));
app.use('/api', require('./routes/StrainAndRecovery.js'));

app.listen(port, () => {
  console.log(`Whoop performance listening on port ${port}`)
})