var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');
var User = mongoose.model('User');
var Photo = mongoose.model('Photo');
var Place = mongoose.model('Place');
var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});
var config;
if(process.env.NODE_ENV === 'production') {
  config = {};
  config.CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
  config.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
  config.JWT_SECRET = process.env.JWT_SECRET;
}else {
  config = require('../config.js');
}

var jwt = require('express-jwt');
var auth = jwt({
  secret: config.JWT_SECRET,
  userProperty: "payload"
});


cloudinary.config({
  cloud_name: 'whereabout',
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET
});


router.param('likeid', function(req, res, next, id) {
  req.likes_id = id;
  next();
});


router.post('/like/:likeid', auth, function(req, res, next) {
  Photo.update({
    "_id": req.likes_id
  }, {
    $push: {
      likes: {
        _id: req.payload.id
      }
    }
  }, function(err, photo) {
    res.send(photo);
  });
});


router.get('/getlikes/:likeid', function(req, res, next){
  Photo.find({
    "_id": req.likes_id
  })
  .populate('likes')
  .exec(function(err, photo){
    res.send(photo);
  });
});

router.post('/base64', function(req, res) {
  cloudinary.uploader.upload(req.body.data, function(result) {
    res.send(result);
  });
});

router.post('/upload', upload.single('uploadedFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  });
});


router.post('/profilephoto', upload.single('uploadedFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  });
});


router.param('profileId', function(req, res, next, id){
  req.profileId = id;
  next();
});


router.post('/updatephoto/:profileId', function(req, res, next) {
  User.findById({
    '_id': req.profileId
  }, function(err, user) {
    user.image = req.body.url;
    user.save(function(err, data){
      if (err) return next(err);
      res.send(data);
    });
  });
});

router.post('/setPhoto', auth, function(req, res) {
  var photo = new Photo();
  photo.title = req.body.title;
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

router.get('/mine', auth, function(req, res) {
  Photo.find({
    'user': req.payload.id
  }).populate('comments')
  .exec(function (err, data) {
    res.send(data);
  });
});

router.post('/delete', auth, function(req, res) {
  Photo.findById({
    '_id': req.body.id
  }, function(err, photo) {
      photo.deletedAt = new Date();
      photo.save(function(err, data) {
        if (err) return next(err);
        res.send(data);
      });
  });
});


router.use(function(err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
