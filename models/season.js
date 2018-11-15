'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const SeasonSchema = mongoose.Schema({
	year: { type: Number, required: true },
	season: { type: String, required: true },
	teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

SeasonSchema.set('toObject', { virtuals: true });

const Season = mongoose.model('Season', SeasonSchema);

module.exports = {Season};