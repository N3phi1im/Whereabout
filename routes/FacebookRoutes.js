var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var jwt = require('express-jwt');

router.get('/auth/facebook', function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if(err) return next(err);
    return res.json({token: user.generateJWT()});
  })(req, res, next);
});

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/Login' }),
  function(req, res) {
		res.send(req.user);
	});

module.exports = router;
