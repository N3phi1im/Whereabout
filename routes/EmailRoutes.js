var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var router = express.Router();
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'whereabout.ad@gmail.com',
    pass: 'ASDFasdf123'
  }
});

router.get('/send', function(req, res, next) {
  transporter.sendMail({
    from: 'admin@whereabout.com',
    to: 'n3ph2535@gmail.com',
    subject: 'Whereabout Password Reset',
    html: '<p>Dear Customer,</p><p></p><p>You have requested to have your password reset for your account at Whereabout</p><p></p><p>Please visit this url to reset your password. </p><p></p><p>Url Here</p><p></p><p>If you received this email in error, you can safely ignore this email.</p>'
  });
  res.end();
});

module.exports = router;
