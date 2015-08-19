var express = require('express');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var router = express.Router();
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');
var User = mongoose.model('User');

router.post('/makePlace', function(req, res) {
  var place = new Place();
  place.name =
  place.google =
  place.photos =
  res.end();
});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
