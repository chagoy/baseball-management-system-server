'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Team} = require('../models/team');
const {Season} = require('../models/season');
const {Game} = require('../models/game');
const {User} = require('../models/user');
const moment = require('moment');
const crypto = require('crypto');

const router = express.Router();
const jsonParser = bodyParser.json();

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true});

router.get('/user', jwtAuth, async (req, res) => {
	let user = await User.findById(req.user.id).populate('players')
	let today = moment().startOf('day').toISOString();
	let end = moment(today).add(6, 'months').toISOString();
	let teams = user.players.map(player => player.team)
	
	return Game.find({
		season: '5c257230981836782a7c6e80',
		$or: [{'home': { $in: teams }}, {'away': {$in: teams}}],
		time: { 
			$gte: today,
			$lt: end
		}
	})
	.sort({time: 1})
	.populate('home')
	.populate('away')
	.then(games => res.status(201).json(games))
	.catch(err => console.error(err.message))
})

router.get('/', (req, res, next) => {
	return Game.find({
		season: '5c257230981836782a7c6e80'
	})
	.sort({time: 1})
	.populate('home')
	.populate('away')
	.then(games => {
		console.log(games);
		res.status(201).json(games);
	})
	.catch(err => console.error(err.message))
})

router.get('/completed', (req, res, next) => {
	return Game.find({
		season: '5c257230981836782a7c6e80',
		completed: true
	})
	.sort({time: 1})
	.populate('home')
	.populate('away')
	.then(games => res.status(201).json(games))
	.catch(err => console.error(err.message))
})

router.get('/upcoming', (req, res, next) => {
	let today = moment().startOf('day').toISOString();
	let end = moment(today).add(6, 'months').toISOString();

	return Game.find({
		season: "5c257230981836782a7c6e80", 
		time: {
			$gte: today,
			$lt: end
		}
	})
	.sort({time: 1})
	.populate('home')
	.populate('away')
	.then(games => console.log(games))
	.catch(err => console.error(err.message))
});

router.get('/:id', (req, res, next) => {
	const { id } = req.params;
	return Game.findOne({_id: id})
		.populate('home')
		.populate('away')
		.then(game => res.status(201).json(game))
		.catch(err => console.error(err))
});

router.get('/byteam/:id', (req, res, next) => {
	let { id } = req.params;
	console.log(id)
	return Game.find({$or: [{home: id}, {away: id}]})
			.populate('home')
			.populate('away')
			.then(games => res.status(201).json(games))
			.catch(err => console.error(err))

})

router.post('/', jwtAuth, jsonParser, (req, res, next) => {
	const requiredFields = ['home', 'away', 'dateTime', 'location'];
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

	let {home, away, location, dateTime} = req.body;
	let game;
	let time = moment(dateTime, 'MM-DD-YYYY h:mm a').toISOString();

	return Game.create({
		home, away, location, time, season: '5c257230981836782a7c6e80'
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

//random change

router.put('/scores', jwtAuth, async (req, res, next) => {

	const { id, homeId, awayId, homeScore, awayScore, dateTime } = req.body;
	let time = moment(dateTime, 'MM-DD-YYYY h:mm a').toISOString();
	console.log(req.body);

	let game = await Game.findByIdAndUpdate({_id: id});

	if (!req.user.admin) {
		return res.status(422).json({message: 'You do not have permission to update game scores'})
	}

	// check if the game already has a delcared winner and loser
	//this means we don't increment a teams wins or losses
	if (game.winner && game.loser) {
		if (homeScore > awayScore) {
			return Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, completed: true, time, winner: game.home, loser: game.away}, {$new: true})
		} else if (awayScore > homeScore) {
			return Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, completed: true, time, winner: game.away, loser: game.home}, {$new: true})
		} else return Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, completed: true, time, draw: true}, {$new: true})
	} else {
		//this handles a fresh game result being added in
		if (homeScore > awayScore) {
			return Team.findByIdAndUpdate({_id: game.home}, {$inc: {"wins": 1}})
			.then(() => Team.findByIdAndUpdate({_id: game.away}, {$inc: {"losses": 1}}))
			.then(() => Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, completed: true, time, winner: game.home, loser: game.away}, {$new: true}))
			.then(updatedGame => res.status(201).json(updatedGame))
		} else if (awayScore > homeScore) {
			return Team.findByIdAndUpdate({_id: game.away}, {$inc: {"wins": 1}})
			.then(() => Team.findByIdAndUpdate({_id: game.home}, {$inc: {"losses": 1}}))
			.then(() => Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, completed: true, time, winner: game.away, loser: game.home}, {$new: true }))
			.then(updatedGame => res.status(201).json(updatedGame))
		} else return Game.findByIdAndUpdate({_id: id}, {completed: true, time, homeScore: homeScore, awayScore: awayScore, draw: true}, {$new: true})
	}

	return res.status(422).json({message: 'An error has occurred updating the scores'})


			// return Team.findByIdAndUpdate({_id: game.home}, {$inc: {"wins": 1}})
			// .then(() => {
			// 	return Team.findByIdAndUpdate({_id: game.away}, {$inc: {"losses": 1}})
			// })

	// 		return !game.winner ? await Team.findByIdAndUpdate({_id: game.home}, {$inc: {"wins": 1}})
	// 		.then(() => !game.loser ? await Team.findByIdAndUpdate({_id: game.away}, {$inc: {"losses": 1}}))
	// 		.then(() => {
	// 			return Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, winner: game.home, loser: game.away}, {$new: true})
	// 		})
	// 		.then(updatedGame => res.status(201).json(updatedGame))
	// 	} else if (awayScore > homeScore) {
	// 		return Team.findByIdAndUpdate({_id: game.away}, {$inc: {"wins": 1}})
	// 		.then(() => {
	// 			return Team.findByIdAndUpdate({_id: game.home}, {$inc: {"losses": 1}})
	// 		})
	// 		.then(() => {
	// 			return Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, winner: game.away, loser: game.home}, {$new: true })
	// 		})
	// 		.then(updatedGame => res.status(201).json(updatedGame))
	// 	} else if (awayScore == homeScore && !game.draw) {
	// 		return Team.findByIdAndUpdate({_id: game.away}, {$inc: {"draws": 1}})
	// 		.then(() => {
	// 			return Team.findByIdAndUpdate({_id: game.home}, {$inc: {"draws": 1}})
	// 		})
	// 		.then(() => {
	// 			return Game.findByIdAndUpdate({_id: id}, {homeScore: homeScore, awayScore: awayScore, draw: true}, { $new: true })
	// 		})
	// 	}
	// } else {
	// 	res.status(422).json({message: 'You are not authorized to update scores'})
	// }
})

module.exports = { router };