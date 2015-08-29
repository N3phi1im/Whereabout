var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');
var Photo = mongoose.model('Photo');
var async = require('async');
var jwt = require('express-jwt'); 
var auth = jwt({
	secret: "Secret_bananas",
	userProperty: "payload"
});

router.param('photoId', function(req, res, next, id){
	req.body.id = id;
	next();
});
router.post('/add/:photoId', auth, function(req, res, next){
	Photo.update({
		'id': req.body.id
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
	Photo.find({
		'id': req.body.id,
	}).populate('comments')
	.exec(function(err, data){
		res.send(data);
	});
});
async.forEach(comments, function(photo, cb) {
	photo.populate('user', 'first_name last_name image', function(err, result) {
		cb();
	});
}, function(err) {
	if (err) return next(err);
	req.par = place;
	next();
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
				console.log(res);
				if (err) return next (err);
				res.send();
			});
});
















module.exports = router;