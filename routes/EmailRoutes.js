var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var nodemailer = require('nodemailer');
var Guid = require('guid');

var emailRoot = "http://localhost:3000/";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'whereabout.ad@gmail.com',
    pass: 'ASDFasdf123'
  }
});

router.post('/check', function(req, res, next) {
  User.findOne({
    'email': req.body.email
  }, function(err, data) {
    if (err) return res.status(400).send(err);
    if (data === null) return res.status(400).send(err);
    res.send(data._id);
  });
});

router.post('/generate', function(req, res, next) {
  User.findById({
    '_id': req.body.id
  }, function(err, user) {
    if(user === undefined) {
      return res.status(400).send(err);
    }
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

router.use(function(err, req, res, next) {
  res.status(500).send(err);
});
module.exports = router;
