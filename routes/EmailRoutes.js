var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var nodemailer = require('nodemailer');
var Guid = require('guid');

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
  }).exec(function(err, data) {
    if(err) return next(err);
    res.send(data._id);
  });
});

router.post('/generate', function(req, res, next) {
  User.findOne({
    '_id': req.body.id
  }).exec(function(err, data){
    var guid = Guid.create();
    data.guid = guid;
    res.send(data);
  });
});

router.post('/send', function(req, res, next) {
  transporter.sendMail({
    from: 'admin@whereabout.com',
    to: req.body.email,
    subject: 'Whereabout Password Reset',
    html: '<p>Dear Customer,</p><p></p><p>You have requested to have your password reset for your account with Whereabout.</p><p></p><p>Please visit this url to reset your password. </p><p></p><p>Url Here</p><p></p><p>If you received this email in error, you can safely ignore this email.</p>'
  });
  res.end();
});

module.exports = router;
