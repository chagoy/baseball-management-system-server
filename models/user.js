'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true, unique: true },
	texting: { type: Boolean, required: true },
	address: { type: String, required: true },
	city: { type: String,required: true },
	zipcode: { type: String, required: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	admin: { type: Boolean, required: true, default: false },
	verified: { type: Boolean, default: false },
	hash: { type: String, required: true},
	resetToken: { type: String, default: null },
	price: { type: Number, required: true, default: 100}
});

UserSchema.virtual('fullName').get(function() {
	return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('finalPrice').get(function() {
	if (this.players.length > 0) {
		return this.price - 15;
	}
	return this.price;
})

UserSchema.virtual('formattedPhone').get(function() {
	return this.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
})

UserSchema.methods.serialize = function() {
	return {
		id: this._id,
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		admin: this.admin, 
		fullName: this.fullName,
		price: this.finalPrice,
		email: this.email
	};
};

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

UserSchema.set('toObject', {
	transform: function(doc, ret) {
		delete ret._id;
		delete ret.password;
		delete ret._v;
	}
}, {virtuals: true});

UserSchema.set('toJson', {
	transform: function(doc, ret) {
		delete ret._id;
		delete ret.password;
		delete ret._v;
	}
}, {virtuals: true});


const User = mongoose.model('User', UserSchema);

module.exports = {User};