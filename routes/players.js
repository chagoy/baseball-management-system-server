'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Player} = require('../models/player');
const {User} = require('../models/user');
const {Team} = require('../models/team');
const {Season} = require('../models/season');
const router = express.Router();
const jsonParser = bodyParser.json();

const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

router.get('/', jwtAuth, jsonParser, (req, res, next) => {
	return Player.find({}).then(data => res.json(data));
})

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

	let {firstName, lastName, sport, division, month, day, year, waiver, certificate} = req.body;
	let user = req.user.id;
	firstName = firstName.trim();
	lastName = lastName.trim();
	let player = '';
	let id = '';
	console.log(certificate);

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
				firstName, lastName, sport, division, month, day, year, waiver, user, certificate, paid: true
			})
		})
		.then(_player => {
			player = _player;
			return User.findByIdAndUpdate(
				{_id: req.user.id}, 
				{$push: { players: _player.id }}
			);
		})
		.then(() => {
			return Season.findByIdAndUpdate({_id: '5ba2bd394a76af4ad3ee4c3a'}, {$push: { players: player.id }});
		})
		.then(() => {
			return res.status(201).json(player);
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
	const user = req.user.id;

	if (req.user.admin) {
		return Player.findById({_id: id})
		.populate('team')
		.populate('user')
		.populate('team.games')
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

router.post('/:id/paid', jwtAuth, jsonParser, (req, res, next) => {
	const {id} = req.params;
	const {paid} = req.body;
	console.log(paid);
	return Player.findByIdAndUpdate({_id: id}, {paid: paid}, {new: true}).populate('team').populate('user')
		.then(player => {
			return res.status(201).json(player);
		})
		.catch(err => console.error(err));
});

router.put('/:id/division', jwtAuth, (req, res, next) => {
	const {id} = req.params;
	const {division} = req.body;

	return Player.findByIdAndUpdate({_id: id}, {$set: {division}}, {new: true}).populate('user')
		.then(player => {
			return res.status(201).json(player);
		})
		.catch(err => console.error(err));
});

router.put('/:id/team', jwtAuth, async (req, res, next) => {
	const {id} = req.params;
	const {team} = req.body;
	console.log('the team is :' + team)
	console.log('the id is :' + id)

	return Team.findOneAndUpdate({_id: team}, { $push: {players: id}})
				.then(() => { 
					return Player.findOneAndUpdate({_id : id}, {$set: {team} }, {new: true}).populate('team').populate('user')
				})
				.then(data => {
					res.json(data)
				})
	// return Team.findOne({_id: id})
	// 	.then(data => {
	// 		console.log(data)
	// 		return Player.findOneAndUpdate({_id: id}, {$set: {team}}, {new: true})
	// 			.populate('team')
	// 			.exec(function(err, player) {
	// 				if (err) {
	// 					console.error(err)
	// 				} else {
	// 					return res.status(201).json(player);
	// 				}
	// 			})
	// 	})

	// return Team.findOneAndUpdate({team: team}, {$push: { players: id}}).then(data => {
	// 		Player.findOneAndUpdate({_id: id}, {$set: {team}}, {new: true})
	// 		.populate('team')
	// 		.exec(function(err, player) {
	// 			if (err) {
	// 				console.error(err)
	// 			} else {
	// 				return res.status(201).json(player);
	// 			}
	// 		});
});

module.exports = {router};