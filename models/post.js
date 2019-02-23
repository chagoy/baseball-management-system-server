'use strict';
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const PostSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	image: { type: String },
	title: { type: String, required: true },
	body: { type: String, required: true }
}, { timestamps: true });

PostSchema.virtual('date').get(function() {
	return moment(this.createdAt).fromNow();
})

PostSchema.set('toObject', { virtuals: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };