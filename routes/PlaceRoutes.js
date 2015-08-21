var express = require('express');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var router = express.Router();
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');
var User = mongoose.model('User');

router.post('/Place', function(req, res, next) {
  console.log(req.body);
  Place.findOne({
    "google.id": req.body.id
  }, function(err, place) {
    if(err) return next(err);
    if(place) return res.send("Existing");
    var newplace = new Place();
    newplace.google.name = req.body.name;
    newplace.google.id = req.body.id;
    newplace.google.address = req.body.formatted_address;
    newplace.save(function(err, place) {
      if(err) return next(err);
      res.send("New");
    });
  });
});

router.get('/Place/info', function(req, res, next) {

});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
