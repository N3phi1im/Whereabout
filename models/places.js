
// Dependencies

var mongoose = require('mongoose');

// Model

var PlaceSchema = new mongoose.Schema({
	google: {
		id: { type: String, unique: true },
		address: String,
		name: String
	},
	photos: [{}]
});

// Model is ready for Use

mongoose.model('Place', PlaceSchema);
