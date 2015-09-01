var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//defines mongoose
var mongoose = require('mongoose');
var passport = require('passport');
//define the models
require('./models/users');
require('./models/places');
require('./models/photo');
require('./config/passport');
//connect to the server
var mongoString;
if(process.env.NODE_ENV === 'production') {
	mongoString = "mongodb://" + process.env.DB_USER + ':' + process.env.DB_PASS+"@"+process.env.DB_HOST + ':'+process.env.DB_PORT+'/whereabout';
}
else mongoString = 'mongodb://localhost/final';
mongoose.connect(mongoString);

var userRoutes = require('./routes/UserRoutes');
var facebookRoutes = require('./routes/FacebookRoutes');
var photoRoutes = require('./routes/PhotoRoutes');
var placeRoutes = require('./routes/PlaceRoutes');
var emailRoutes = require('./routes/EmailRoutes');
var commentRoutes = require('./routes/CommentRoutes');

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
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
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
app.use('/api/Comment', commentRoutes);

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Whereabout running on port ' + port);
});
