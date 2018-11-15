'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TeamSchema = mongoose.Schema({
	name: { type: String, required: true },
	division: { type: String, required: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season' },
	wins: { type: Number, default: 0 },
	losses: { type: Number, default: 0 },
	draws: { type: Number, default: 0 },
	logo: { type: String }
});

TeamSchema.virtual('record').get(function() {
	if (this.draws) {
		return `${this.wins}-${this.losses}-${this.draws}`;
	}
	return `${this.wins}-${this.losses}`;
});

TeamSchema.virtual('nameAndDivision').get(function() {
	return `${this.name} - ${this.division[0].toUpperCase()}`;
})

TeamSchema.set('toObject', {virtuals: true})

const Team = mongoose.model('Team', TeamSchema);

module.exports = {Team};