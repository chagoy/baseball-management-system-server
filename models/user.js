'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	texting: { type: Boolean, required: true },
	address: { type: String, required: true },
	city: { type: String,required: true },
	zipcode: { type: String, required: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	admin: { type: Boolean, required: true, default: false }
});

UserSchema.virtual('fullName').get(function() {
	return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.serialize = function() {
	return {
		id: this._id,
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		admin: this.admin
	};
};

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

UserSchema.set('toObject', {virtuals: true})


const User = mongoose.model('User', UserSchema);

module.exports = {User};