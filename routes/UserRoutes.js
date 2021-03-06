var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var jwt = require('express-jwt');

var config;
if(process.env.NODE_ENV === 'production') {
  config = {};
  config.JWT_SECRET = process.env.JWT_SECRET;
}else {
  config = require('../config.js');
}

var auth = jwt({
  secret: config.JWT_SECRET,
  userProperty: "payload"
});

router.post('/Update', auth, function(req, res, next) {
  User.findById({
    "_id": req.payload.id
  }, function(err, user) {
    user.email = req.body.user.email;
    user.first_name = req.body.user.first_name;
    user.last_name = req.body.user.last_name;
    user.age = req.body.user.age;
    user.gender = req.body.user.gender;
    user.setPassword(req.body.user.password);
    user.save(function(err, user) {
      if (err) return next(err);
      res.json({
        token: user.generateJWT()
      });
    });
  });
});

router.post('/Register', function(req, res, next) {
  var user = new User();
  user.email = req.body.email;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    if (err) return next(err);
    res.json({
      token: user.generateJWT()
    });
  });
});

router.post('/Login', function(req, res, next) {
  if (!req.body.email || !req.body.password) return res.status(400).send("Please fill out every field");
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (user) return res.json({
      token: user.generateJWT()
    });
    return res.status(400).send(info);
  })(req, res, next);
});

router.post('/change', function(req, res, next) {
  User.findById({
    '_id': req.body.id
  }, function(err, user) {
    if (user.resetGuid === req.body.guid) {
      user.setPassword(req.body.password);
      user.save(function(err, data) {
        if (err) return next(err);
        res.send(data);
      });
    }
  });
});

router.use(function(err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
