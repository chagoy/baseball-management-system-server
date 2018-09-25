'use strict';
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const GameSchema = mongoose.Schema({
	season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season' },
	home: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	away: { type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
	time: { type: String, required: true },
	location: { type: String, required: true },
	winner: { type: Number },
	loser: { type: Number },
	draw: { type: Boolean },
	homeScore: { type: Number },
	awayScore: { type: Number }
});

GameSchema.virtual('date').get(function() {
	return moment(this.time).format("dddd, MMMM Do");
});

GameSchema.virtual('realTime').get(function() {
	return moment(this.time).format("h:mm a");
});

GameSchema.set('toObject', {virtuals: true});
const Game = mongoose.model('Game', GameSchema);

module.exports = {Game};