var express = require('express');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var router = express.Router();
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');
var User = mongoose.model('User');

router.post('/makePlace', function(req, res, next) {
  var place = new Place();
  place.google.name = req.body.name;
  place.google.geo = req.body.geo;
  place.google.address = req.body.address;
  place.google.hours = req.body.hours;
  place.save(function(err, place) {
    if(err) return next(err);
      
  });
  res.send();
});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;