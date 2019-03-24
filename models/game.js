'use strict';
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const GameSchema = mongoose.Schema({
	season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season' },
	home: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
	away: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
	time: { type: String, required: true },
	location: { type: String },
	winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	loser: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	draw: { type: Boolean, default: false },
	homeScore: { type: Number },
	awayScore: { type: Number },
	completed: { type: Boolean, default: false },
	division: { type: String }
});

GameSchema.set('toJson', {virtuals: true});
GameSchema.set('toObject', {virtuals: true});

GameSchema.virtual('date').get(function() {
	return moment(this.time).format("dddd, MMMM Do");
});

GameSchema.virtual('realTime').get(function() {
	return moment(this.time).format("h:mm a");
});

const Game = mongoose.model('Game', GameSchema);

module.exports = {Game};