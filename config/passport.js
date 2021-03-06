var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var config;
if (process.env.NODE_ENV === 'production') {
    // Do something
    config = {};
    config.FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
    config.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
    config.FACEBOOK_CALLBACK = 'http://whereaboutapp.herokuapp.com';
}
else {
  config = require('../config.js');
}

passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
      if(err) return done(err);
      if(!user) return done(null, false, {message: 'Incorrect email.'});
      if(!user.validatePassword(password)) return done(null, false, {message: 'Password does not match.'});
      return done(null, user);
    });
}));


passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK_CLIENT_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET,
  callbackURL: config.FACEBOOK_CALLBACK + "/api/Facebook/auth/facebook/callback",
  passReqToCallback: true,
  profileFields: ['id', 'photos', 'name', 'emails', 'gender', 'birthday']
},
function(req, accessToken, refreshToken, profile, done){
  User.findOne({
            'facebook.id' : profile.id
        },function(err,user){
        if(err){
            done(err);
        }
        if(user){
            req.login(user,function(err){
                if(err){
                    return done(err);
                }
                return done(null, user);
            });
        }else{
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.last_name = profile.name.familyName;
            newUser.first_name = profile.name.givenName;
            newUser.gender = profile.gender;
            newUser.email = profile.emails[0].value;
            newUser.image = profile.photos[0].value;
            newUser.save(function(err){
                if(err){
                    throw(err);
                }
                req.login(newUser,function(err){
                    if(err){
                        return done(err);
                    }
                    return done(null, newUser);
                });
            });
        }
    });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, user){
    if(err) return done(err);
    done(null, user);
  });
});
