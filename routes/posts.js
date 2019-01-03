'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Post } = require('../models/post');
const router = express.Router();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const passport = require('passport');
const multer = require('multer')

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});
const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'mpk',
	allowedFormats: ['jpg', 'jpeg', 'png']
});
const upload = multer({storage: storage}).single('image');

router.post('/', jwtAuth, upload, async (req, res, next) => {
	if (req.user.admin) {
		const image = req.file.url;

		const requiredFields = ['title', 'body'];
		const missingField = requiredFields.find(field => !(field in req.body));
		if (missingField) {
			return res.status(422).json({
				code: 422, 
				reason: 'ValidationError',
				message: 'Missing field',
				location: missingField
			})
		}

		const stringFields = ['title', 'body'];
		const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string');
		if (nonStringField) {
			return res.status(422).json({
				code: 422,
				reason: 'ValidationError',
				message: 'Incorrect field type, expected string',
				location: nonStringField
			})
		}

		let { title, body } = req.body;
		let user = req.user.id;
		title = title.trim();
		let post;

		return Post.find({title, body})
			.count()
			.then(count => {
				if (count > 0) {
					return Promise.reject({
						code: 422,
						reason: 'ValidationError',
						message: 'Post already exists',
						location: 'Post'
					})
				}
			})
			.then(() => {
				console.log('about to create')
				return Post.create({title, body, image, author: user})
			})
			.then(_post => {
				post = _post;
				console.log(post)
				return Season.findByIdAndUpdate({_id: '5c257230981836782a7c6e80'}, {$push: { posts: _post.id }});
			})
			.then(() => {
				return res.status(201).json(post);
			})
			.catch(err => {
				if (err.reason === 'ValidationError') {
					return res.status(err.code).json(err)
				}
				res.status(500).json({code: 500, message: 'Internal server error'})
			})
	}
	return res.status(401).json({message: 'Unauthorized to make this post.'})
})

router.get('/', (req, res, next) => {
	return Post.find({})
		.then(posts => res.status(201).json(posts))
})

module.exports = { router };