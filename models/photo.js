
// Dependencies

var mongoose = require('mongoose');

// Model

var PhotoSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
  createdAt: { type: Date, 'default': Date.now },
  deletedAt: { type: Date, 'default': null },
  strikes: Number,
  title: String,
  comments: [{
		body: String,
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		dateCreated: Date,
    dateEdited: Date,
    dateDeleted: Date
	}]
});

// Model is ready for Use

mongoose.model('Photo', PhotoSchema);
