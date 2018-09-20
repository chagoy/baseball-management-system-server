'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TeamSchema = mongoose.Schema({
	name: { type: String, required: true },
	division: { type: String, required: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season' }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = {Team};