var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//defines mongoose
var mongoose = require('mongoose');
var passport = require('passport');
//define the models
require('./models/Users');
require('./models/Places');
require('./models/Photo');
require('./config/passport');
//connect to the server
mongoose.connect('mongodb://localhost/final');

var userRoutes = require('./routes/UserRoutes');
var facebookRoutes = require('./routes/FacebookRoutes');
var photoRoutes = require('./routes/PhotoRoutes');
var placeRoutes = require('./routes/PlaceRoutes');
var emailRoutes = require('./routes/EmailRoutes');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(passport.initialize());



//on homepage load, render the index page

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/api/Users', userRoutes);
app.use('/api/Facebook', facebookRoutes);
app.use('/api/Photos', photoRoutes);
app.use('/api/Places', placeRoutes);
app.use('/api/Email', emailRoutes);

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
