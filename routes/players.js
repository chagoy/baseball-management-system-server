'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Player} = require('../models/player');
const {User} = require('../models/user');
const Team = require('../models/team');
const router = express.Router();
const jsonParser = bodyParser.json();

const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

router.post('/', jwtAuth, jsonParser, (req, res, next) => {
	const requiredFields = ['firstName', 'lastName', 'month', 'day', 'year', 'sport', 'division', 'waiver'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Missing field',
			location: missingField
		});
	}

	const stringFields = ['firstName', 'lastName', 'sport', 'division', 'waiver'];
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

	let {firstName, lastName, sport, division, month, day, year, waiver} = req.body;
	let user = req.user.id;
	firstName = firstName.trim();
	lastName = lastName.trim();
	let player = '';
	let id = '';

	return Player.find({firstName, lastName, month, day, year})
		.count()
		.then(count => {
			if (count > 0) {
				return Promise.reject({
					code: 422, 
					reason: 'ValidationError',
					message: 'Player already exists',
					location: 'firstName'
				});
			}
		})
		.then(() => {
			return Player.create({
				firstName, lastName, sport, division, month, day, year, waiver, user
			})
		})
		.then(_player => {
			player = _player;
			return User.findByIdAndUpdate(
				{_id: req.user.id}, 
				{$push: { players: _player.id }}
			);
		})
		.then((player) => {
			return res.status(201).json(player.serialize());
		})
		.catch(err => {
			console.log(err);
			if (err.reason === 'ValidationError') {
				return res.status(err.code).json(err);
			}
			res.status(500).json({code: 500, message: 'Internal server error'});
		});
});

router.get('/:id', jwtAuth, jsonParser, (req, res, next) => {
	const {id} = req.params;
	const user = req.user.id
	console.log(req.user.id)
	if (req.user.admin) {
		return Player.findById({_id: id})
		.populate('team')
		.populate('user')
		.exec(function(err, player) {
		if (err) {
			console.error(err)
		} else {
			return res.status(201).json(player)
		}
	}) 
	} else {
		return Player.findOne({_id: id, user: user})
		.populate('team')
		.populate('user')
		.exec(function(err, player) {
			if (err) {
				console.error(err)
			} else {
				return res.status(201).json(player)
			}
		});
	}
});

router.post('/:id/paid', jwtAuth, (req, res, next) => {
	const {id} = req.params;
	return Player.findById({_id: id})
		.then(player => {
			return res.status(201).json(player);
		})
		.catch(err => console.error(err));
});

router.put('/:id/division', jwtAuth, (req, res, next) => {
	const {id} = req.params;
	const {division} = req.body;

	return Player.findByIdAndUpdate({_id: id}, {$set: {division}}, {new: true})
		.then(player => {
			return res.status(201).json(player);
		})
		.catch(err => console.error(err));
});

router.put('/:id/team', jwtAuth, (req, res, next) => {
	const {id} = req.params;
	const {team} = req.body;
	console.log(team.team);
	return Player.findOneAndUpdate({_id: id}, {$set: {team}}, {new: true})
		.populate('team')
		.exec(function(err, player) {
			if (err) {
				console.error(err)
			} else {
				return res.status(201).json(player);
			}
		});
});

module.exports = {router};