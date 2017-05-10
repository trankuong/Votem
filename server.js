// Modules
var express = require('express');
var session = require('express-session');
var bodyParser	 = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var app = express();

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3000;

// Connect to mongodb
console.log(db.url);
mongoose.createConnection(db.url);
//mongoose.connect(db.url);

// Test to see if query returns
var User = require('./app/models/usermodel');
User.find().then(
	function(){
		console.log("returned from find");
	}
);

// set up session secret
app.use(session({
	secret: "\xd1W\xd3\xb4\x8fS\xcax\x15t6v\x0edi\xc5\xf7\x84\xb1\x8c\x81\xe2\xeaW\x98\xce&\x00\xe6\xcf",
	resave: false,
	saveUninitialized: true
}));

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'})); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 

var sess;

// Api routes
var vote = require('./app/routes/vote');
app.use('/vote', vote);

var totalvotes = require('./app/routes/totalvotes');
app.use('/totalvotes', totalvotes);

var login = require('./app/routes/login');
app.use('/login', login);

var logout = require('./app/routes/logout');
app.use('/logout', logout);

// Serve index file
require('./app/routes/routes')(app);

console.log("server started");

console.log(port);

app.listen(port);

exports = module.exports = app;