'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Team} = require('../models/team');
const {Season} = require('../models/season');
const {Game} = require('../models/game');

const router = express.Router();
const jsonParser = bodyParser.json();

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true});

router.post('/', jwtAuth, jsonParser, (req, res, next) => {
	const requiredFields = ['home', 'away', 'time', 'location'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Missing field',
			location: missingField
		})
	}

	const stringFields = ['home', 'away', 'location'];
	const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string'
		);

	if (nonStringField) {
		return res.status(422).json({
			code: 422, 
			reason: 'ValidationError',
			message: 'Incorrect field type: expected string', 
			location: nonStringField
		});
	}

	let {home, away, location, time} = req.body;
	let game;
	return Game.create({
		home, away, location, time, season: '5ba2bd394a76af4ad3ee4c3a'
	})
	.then(_game => {
		game = _game;
		return Season.findByIdAndUpdate({_id: game.season}, {$push: { games: game._id }})
	})
	.then(() => {
		return res.status(201).json(game);
	})
	.catch(err => {
		if (err.reason === 'ValidationError') {
			return res.status(err.code).json(err);
		}
		res.status(500).json({code: 500, message: 'internal server error'})
	})
})

module.exports = { router };