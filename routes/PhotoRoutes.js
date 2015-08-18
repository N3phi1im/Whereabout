var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'whereabout',
  api_key: '482554732538581',
  api_secret: 'qeL8V9TKF5O-xuYgCRINKmIhRaY'
});

router.post('/upload', function(req, res) {
  cloudinary.uploader.upload("http://www.dodge.com/assets/images/vehicles/2015/challenger/homepage/Featurette/2015-challenger-vlp-muscleup.jpg");
    res.end();
});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
