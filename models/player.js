'use strict';
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const PlayerSchema = mongoose.Schema({
 	firstName: { type: String, required: true },
 	lastName: { type: String, required: true },
 	month: { type: Number, required: true },
 	day: { type: Number, required: true },
 	year: { type: Number, required: true },
 	sport: {type: String, required: true, default: 'baseball' },
 	paid: { type: Boolean, default: false },
 	division: { type: String, required: true },
 	// certificate: { type: File, default: null }
 	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
 });

PlayerSchema.virtual('fullName').get(function() {
	return `${this.firstName} ${this.lastName}`;
});

PlayerSchema.virtual('dob').get(function() {
	return `${this.month}/${this.day}/${this.year}`;
});

PlayerSchema.virtual('playingAge').get(function() {
		let currentAge = moment([this.year, this.month - 1, this.day]);
		let cutoff = moment([2018, 7, 31]);
		let playingAge = cutoff.diff(currentAge, 'years', true);
		return playingAge.toFixed(3);
})

PlayerSchema.methods.serialize = function() {
	return {
		id: this._id,
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		paid: this.paid,
		division: this.division,
		team: this.team
	};
};

PlayerSchema.set('toObject', {virtuals: true})

const Player = mongoose.model('Player', PlayerSchema);

module.exports = {Player};