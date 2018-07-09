
'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const {Player} = require('../models/player');

const createAuthToken = function(user) {
	return jwt.sign({user}, config.JWT_SECRET, {
		subject: user.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

const localAuth = passport.authenticate('local', {session: false, failWithError: true});

router.use(bodyParser.json());

router.post('/login', localAuth, (req, res) => {
	const authToken = createAuthToken(req.user);
	console.log({authToken})
	res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

router.post('/refresh', jwtAuth, (req, res) => {
	const authToken = createAuthToken(req.user);
	res.json({authToken});
});

router.get('/protected', jwtAuth, (req, res) => {
	return Player.find({})
			.then(data => {
				res.json(data);
			})
})

module.exports = {router};