
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
  comments: []
});

// Model is ready for Use

mongoose.model('Photo', PhotoSchema);
