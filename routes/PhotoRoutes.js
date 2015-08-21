var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');


cloudinary.config({
  cloud_name: 'whereabout',
  api_key: '482554732538581',
  api_secret: 'qeL8V9TKF5O-xuYgCRINKmIhRaY'
});

router.post('/upload', function(req, res) {
  console.log(req);
  cloudinary.uploader.upload("image", function(result) {
    res.send();
  });
});


router.post('/setPhoto', function(req, res) {
  var photo = new Photo();
  photo.url = req.body.url;
  photo.user = req.body.user.id;
  photo.place = req.body.place.id;
  photo.createdAt = new Date();
  photo.title = req.body.title;
  res.send(photo.id);
});

router.post('/setPlace', function(req, res) {
  Place.findByIdAndUpdate(
    Place.google.id,
    {$push: {"photos": {id: req.body.id }}},
    {save: true, upsert: true, new: true},
    function(err) {
      console.log(err);
      res.end();
    });
});

router.get('/getPhotos', function(req, res) {

});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
