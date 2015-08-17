var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
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

passport.use(new FacebookStrategy({
  clientID: 859731630748483,
  clientSecret: 8fa6616b6633811575b699b0e574974d,
  callbackURL: "http://www.example.com/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
