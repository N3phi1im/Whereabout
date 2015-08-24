
// Dependencies

var mongoose = require('mongoose');

// Model

var PlaceSchema = new mongoose.Schema({
	google: {
		id: { type: String, unique: true },
		address: String,
		name: String
	},
	photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
});

// Model is ready for Use

mongoose.model('Place', PlaceSchema);
