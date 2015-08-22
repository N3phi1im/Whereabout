
// Dependencies

var mongoose = require('mongoose');

// Model

var PhotoSchema = new mongoose.Schema({
  url: String,
  id: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
  createdAt: { type: Date, 'default': Date.now },
  deletedAt: { type: Date, 'default': null },
  strikes: Number,
  likes: [{
    dateLiked: { type: Date, 'default': Date.now },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  title: String,
  comments: [{
    body: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: { type: Date, 'default': Date.now },
    dateEdited: { type: Date, 'default': null },
    dateDeleted: { type: Date, 'default': null }
  }]
});

// Model is ready for Use

mongoose.model('Photo', PhotoSchema);
