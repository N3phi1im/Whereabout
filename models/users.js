var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var config;
if(process.env.NODE_ENV === 'production') {
  config = {};
  config.JWT_SECRET = process.env.JWT_SECRET;
}else {
  config = require('../config.js');
}

var UserSchema = new mongoose.Schema({
	first_name: { type: String, 'default': null },
	last_name: { type: String, 'default': null },
	image: { type: String, 'default': 'http://res.cloudinary.com/whereabout/image/upload/v1440793240/placeholder_l0m8mw.png' },
	age: { type: Number, 'default': null },
	gender: { type: String, 'default': null },
	email: {type: String, unique: true, lowercase: true},
	facebook: {
		id: String
	},
	follow: [{type: mongoose.Schema.Types.ObjectId, ref: 'Place'}],
	resetGuid: {type: String, 'default': null},
	passwordHash: String,
	salt: String
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return (hash === this.passwordHash);
};

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 1);
	return jwt.sign({
		follow: this.follow,
		id: this._id,
		first_name: this.first_name,
		last_name: this.last_name,
		image: this.image,
		exp: parseInt(exp.getTime() / 1000)
	}, config.JWT_SECRET);
};

mongoose.model('User', UserSchema);
