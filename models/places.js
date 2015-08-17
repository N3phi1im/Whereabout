
// Dependencies

var mongoose = require('mongoose');

// Model

var PlaceSchema = new mongoose.Schema({
	name: { type: String, lowercase: true, unique: true },
  google: Schema.Types.Mixed,
  photos_of_place: []
});

// Model is ready for Use

mongoose.model('Place', PlaceSchema);
