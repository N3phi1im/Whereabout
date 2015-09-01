var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var nodemailer = require('nodemailer');
var Guid = require('guid');

var config;
if(process.env.NODE_ENV === 'production') {
  config = {};
  config.EMAIL_ROOT = process.env.EMAIL_ROOT;
  config.EMAIL_USER = process.env.EMAIL_USER;
  config.EMAIL_PASS = process.env.EMAIL_PASS;
}else {
  config = require('../config.js');
}

var emailRoot = config.EMAIL_ROOT;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

router.post('/check', function(req, res, next) {
  User.findOne({
    'email': req.body.email
  }).exec(function(err, data) {
    if (err) return next(err);
    res.send(data._id);
  });
});

router.post('/generate', function(req, res, next) {
  User.findById({
    '_id': req.body.id
  }, function(err, user) {
    var guid = Guid.create();
    user.resetGuid = guid;
    user.save(function(err, data) {
      res.send(guid);
    });
  });
});

router.post('/send', function(req, res, next) {
  var url = emailRoot + "#/PasswordReset?code=" + req.body.request.guid + "&token=" + req.body.request.id;
  transporter.sendMail({
    from: 'admin@whereabout.com',
    to: req.body.request.email,
    subject: 'Whereabout Password Reset',
    html: '<p>Dear Customer,</p><p></p><p>You have requested to have your password reset for your account with Whereabout.</p><p></p><p>Please visit this url to reset your password. </p><p></p><p><a href="' + url + '">Reset my Password!</a></p><p></p><p>If you received this email in error, you can safely ignore this email.</p>'
  });
  res.end();
});

module.exports = router;
