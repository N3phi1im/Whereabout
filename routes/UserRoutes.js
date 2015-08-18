var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var jwt = require('express-jwt');

router.post('/Register', function(req, res, next) {
	var user = new User();
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.save(function(err, user) {
		if(err) return next(err);
		res.json({token: user.generateJWT()});
	});
});

router.post('/Login', function(req, res, next) {
	if(!req.body.email || !req.body.password) return res.status(400).send("Please fill out every field");
	passport.authenticate('local', function(err, user, info) {
		if(err) return next(err);
		if(user) return res.json({token : user.generateJWT()});
		return res.status(400).send(info);
	})(req, res, next);
});

router.use(function(err, req, res, next) {
	res.status(500).send(err);
});

module.exports = router;
