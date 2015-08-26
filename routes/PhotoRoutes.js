var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');
var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});
var jwt = require('express-jwt');
var auth = jwt({
  secret: "Secret_bananas",
  userProperty: "payload"
});


cloudinary.config({
  cloud_name: 'whereabout',
  api_key: '482554732538581',
  api_secret: 'qeL8V9TKF5O-xuYgCRINKmIhRaY'
});

router.post('/upload', upload.single('uploadedFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  });
});


router.post('/setPhoto', auth, function(req, res) {
  var photo = new Photo();
  photo.url = req.body.url;
  photo.user = req.payload.id;
  photo.id = req.body.id;
  photo.createdAt = new Date();
  photo.save(function(err, Photo) {
    res.send(Photo);
  });
});

router.post('/setPlace', function(req, res) {
  Place.update({
      'google.id': req.body.google
    }, {
      $push: {
        photos: {
          _id: req.body._id
        }
      }
    },
    function(err) {
      res.send('posted');
    });
});

router.get('/getPhotos', function(req, res) {

});

router.use(function(err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
