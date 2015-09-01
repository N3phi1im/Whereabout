var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');
var Photo = mongoose.model('Photo');
var async = require('async');
var jwt = require('express-jwt');

var config;
if(process.env.NODE_ENV === 'production') {
  config = {};
  config.JWT_SECRET = process.env.JWT_SECRET;
}else {
  config = require('../config.js');
}

var auth = jwt({
	secret: config.JWT_SECRET,
	userProperty: "payload"
});

router.param('photoId', function(req, res, next, id){
	req.body.id = id;
	next();
});
router.post('/add/:photoId', auth, function(req, res, next){
	Photo.update({
		'_id': req.body.id
	},
	{
		$push: {
			comments: {
				body: req.body.comment,
				user: req.payload.id
			}}},
			function(err, comment) {
				console.log(err);
				res.send(comment);
			}
			);
}
);


router.get('/get/:photoId', auth, function(req, res, next){
	// console.log(req.body.id);
	Photo.findOne({
		'_id': req.body.id,
	}).populate('comments.user')
	.exec(function(err, data){
		if (err) return next(err);
		res.send(data);
	});
});



router.param('commentId', function(req, res, next, id){
	req.body.id = id;
	next();
});

router.post('/delete/:commentId', auth, function(req, res, next) {
	Photo.update({
		'Photo.id': req.body.photo.id, 'comments._id': req.body.id},{
			$set: {'comments.$.dateDeleted': new Date()}},

			function(err, photo){
				if (err) return next (err);
				res.send();
			});
});
















module.exports = router;
