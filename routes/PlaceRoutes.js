var express = require('express');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var router = express.Router();
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');
var User = mongoose.model('User');


router.param('par', function(req, res, next, id){
  Place.findOne({'google.id': id}).populate('photos').exec(function(err, place){
    if (err) return next (err);
    // console.log(place[0].photos);
    req.par = place;
    next();
  });
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
  console.log('Hit the route');

  //   Photo.find({id : req.par[0].photos[i].id}).exec(function(err, photo) {
  //     req.par[0].photos[i] = photo;
  //     console.log(req.par);
  //   });
  // }
  // console.log("outside");
  // console.log(req.par);
  res.send(req.par);

});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
