var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');
var Photo = mongoose.model('Photo');
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

router.get('/get/:photoId', function(req, res, next){
	Photo.find({
		'id': req.body.id,
	}).populate('comments')
	.exec(function(err, data){
		res.send(data);
	});
}







);
module.exports = router;