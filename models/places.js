
// Dependencies

var mongoose = require('mongoose');

// Model

var PlaceSchema = new mongoose.Schema({
	name: { type: String, lowercase: true, unique: true },
  google: Schema.Types.Mixed,
  photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
});

// Model is ready for Use

mongoose.model('Place', PlaceSchema);
