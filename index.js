const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/main');
const router = require('./router');
const passport = require('passport');
// Express session middleware
const session = require('express-session');
// Utilities for working with file and dir paths
const path = require('path');

// Database Connection
mongoose.connect(process.env.DATACENTRE_DB);
// mongoose.connect(config.database);
const { connection: db } = mongoose;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to database:', db);
});
// Start the server
// const server = app.listen(config.port);
// console.log('Your server is running on port ' + config.port + '.');

// Start the server
let server;
if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.port);
  console.log(`Your server is running on port ${config.port}.`);
  // console.log(typeof config.secret);
} else{
  server = app.listen(config.test_port);
}

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Express session
app.use(session({
  // Secret can be anything
  //hide in dot env
  secret: "jelly bean",
  saveUninitialized: true,
  resave: true,
}));

// Public folder for publicly accessible files
app.use(express.static(path.join(__dirname, 'public')));

// Init passport
app.use(passport.initialize());
app.use(passport.session());
// View engine (ejs)
// Want folder views to handle views
app.set('views', path.join(__dirname, 'views'));
// Default layout in layouts folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);

// necessary for testing
module.exports = server;
