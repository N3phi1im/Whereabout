var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if(err) return done(err);
      if(!user) return done(null, false, {message: 'Incorrect username.'});
      if(!user.validatePassword(password)) return done(null, false, {message: 'Password does not match.'});
      return done(null, user);
    });
}));
