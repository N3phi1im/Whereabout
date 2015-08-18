var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var jwt = require('express-jwt');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/Login' }),
  function(req, res) {
		res.send(req.user, {token: user.generateJWT()});
	});

  module.exports = router;
