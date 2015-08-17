var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	first_name: { type: String, 'default': null },
	last_name: { type: String, 'default': null },
	image: { type: String, 'default': null },
	age: { type: Number, 'default': null },
	gender: { type: String, 'default': null },
	email: {type: String, unique: true, lowercase: true},
	facebook: {},
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
		id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, 'Secret_bananas');
};

mongoose.model('User', UserSchema);
