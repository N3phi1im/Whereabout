var express = require('express');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var router = express.Router();
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');
var User = mongoose.model('User');
var async = require('async');
var jwt = require('express-jwt');
var auth = jwt({secret: "Secret_bananas", userProperty: "payload"});

router.param('par', function(req, res, next, id){
  Place.findOne({'google.id': id})
  .populate('photos')
  .exec(function(err, place){
    async.forEach(place.photos, function(photo, cb) {
      photo.populate('user', 'first_name last_name image', function(err, result) {
        cb();
      });
    }, function(err) {
      if(err) return next(err);
      req.par = place;
      next();
    });
  });
});

router.param('fid', function(req, res, next, id){
  req.follow_id = id;
  next();
});

router.post('/Place', function(req, res, next) {
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

router.get('/Place/info/:par', function(req, res, next) {
  res.send(req.par);
});

router.post('/follow/:fid', auth, function(req, res, next){
  User.update({ "_id": req.payload.id },
    { $push: {follow: {_id: req.follow_id}}}, function(err, user) {
      console.log(err);

      res.send(user);
    });
});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
