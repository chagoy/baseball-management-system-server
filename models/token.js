'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const TokenSchema = mongoose.Schema({
	hash: { type: String, unique: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

TokenSchema.methods.validateToken = function() {
	let difference = (new Date().getTime() - this.createdAt.getTime()) / 1000;
	return difference > 10800 ? false : true;
}

const Token = mongoose.model('Token', TokenSchema);

module.exports = { Token };

