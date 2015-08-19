var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var jwt = require('express-jwt');

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/Login' }), function(req, res) {
    if(req.isAuthenticated()) {
      var token = { token: req.user.generateJWT()};
      res.redirect('/#/Token/' + token.token);
    }
    else {
      res.send("You are Not authenticated.");
    }
});

module.exports = router;
