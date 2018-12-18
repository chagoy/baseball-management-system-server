'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Player} = require('../models/player');
const {User} = require('../models/user');
const {Team} = require('../models/team');
const {Season} = require('../models/season');
const router = express.Router();
const jsonParser = bodyParser.json();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const passport = require('passport');
const multer = require('multer')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
const upload = multer({storage: storage}).single('certificate');

const Json2csvParser = require('json2csv').Parser;

router.get('/csv/:id', async (req, res, next) => {
	
	const {id} = req.params;
	let user = await User.findOne({_id: id});
	
	if (!user.admin) {
		console.log(user.admin)
		res.status(422).json('You are not authorized to see this information')
	}
	let players = await Player.find({}).populate('user').populate('team');
	const fields = [ 'sport',
	'paid',
	'fullName',
	'playingAge',
	'dob',
  'waiver',
  'certificate',
  'jersey',
  'request',
  'team.name',
  'team.division',
  'user.fullName',
  'user.phone',
  'user.email',
  'user.address',
  'user.city',
  'user.zipcode',
  'user.texting',
  'notes' ]

	const json2csv = new Json2csvParser({fields})
	const csv = json2csv.parse(players)
	console.log('supposed to be')

	res.attachment('league.csv');
  res.status(200).send(csv);
})

router.get('/', jwtAuth, jsonParser, (req, res, next) => {
	return Player.find({}).populate('user').populate('team').then(data => res.json(data));
})

router.post('/', jwtAuth, upload, async (req, res, next) => {
	const requiredFields = ['firstName', 'lastName', 'month', 'day', 'year', 'sport', 'division', 'waiver'];
	let certificate = req.file.url;
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

	let { firstName, lastName, sport, division, month, day, year, waiver, jersey, team, parentContract, request, fundraiser } = req.body;
	let user = req.user.id;
	firstName = firstName.trim();
	lastName = lastName.trim();
	let player = '';
	let id = '';
	console.log(certificate)

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
				firstName, lastName, sport, division, month, day, year, waiver, parentContract, user, certificate, jersey, request, fundraiser, paid: true
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
			console.log(req.user.email)
			const msg = {
				to: req.user.email,
				from: 'mpkbaseball@gmail.com',
				subject: `Thank you for registering ${player.firstName} for the Spring Season - MPK Baseball & Softball`,
				text: `Dear ${req.user.fullName}, Thank you for registering your child for the Spring 2019 season with MPK Baseball & Softball. If your child is registered for Shetland, coaches will have their rosters by late January and we will reach out then with practice times. For those of you who are playing in Pinto or above, you will be required to participate in an evaluation and before the draft (unless you've been contacted and told you will be locked by a coach). Evaluation dates for Pinto - Jan 16 - 5:45pm, Mustang - Jan 17 - 5:45pm, Bronco - Jan 17 - 7:30pm, Pony - Jan 16 - 7:30pm.`,
				html: `<h2>Welcome to the MPK Baseball & Softball Spring 2019 Season</h2>
				<p>Thank you for registering your child and participating with us for the Spring 2019 season. More information regarding the season will come out as we get closer to the season starting.</p>
				<p>Jersey sizing takes place in person so please come out and see us in person at one of our in-person registration dates (usually Friday nights at Garvey Ranch Park by the snack bar) to get sized.</p>
				<p>If your child is registered for Shetland, rosters should be finalized by January 12th and you can expect to be contacted shortly thereafter.</p>
				<p>Pinto, Mustang, Bronco, and PONY teams are constructed through a draft. Coaches get 3 players to lock-in and the rest of the team is selected through a draft. Players who are not locked are required to come out for a player evaluation.</p>
				<ul>
					<li>Pinto - Jan 16 - 5:45pm</li>
					<li>Mustang - Jan 17 - 5:45pm</li>
					<li>Bronco - Jan 17 - 7:30pm</li>
					<li>PONY - Jan 16 - 7:30pm</li>
				</ul>
				<p>Rosters will be sent out for all teams within a week of evaluations.</p>
				<p>If you're interested in coaching you can <a href='mailto:mpkbaseball15@gmail.com'>send us an email</a>. If you have any other questions please feel free to reach out by replying to this email or sending a text to the number below.</p>

				<p>-MPK Board</p>
				<p>404-374-5014</p>
				`
			}
			return sgMail.send(msg)
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
		.populate({
			path: 'user',
			populate: {
				path: 'players'
			}
		})
		// .populate('user')
		// .populate('user.players')
		// .populate('team.games')
		.exec(function(err, player) {
		if (err) {
			console.error(err)
		}
		return res.status(201).json(player)
	}) 
	} else {
		return Player.findOne({_id: id, user: user})
		.populate('team')
		.populate({
			path: 'user',
			populate: {
				path: 'players'
			}
		})
		.then(player => res.status(201).json(player))
		.catch(err => res.status(422).json(err))
	}
});

router.post('/:id/paid', jwtAuth, jsonParser, (req, res, next) => {
	const {id} = req.params;
	const {paid} = req.body;
	// console.log(paid);
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

router.put('/:id/notes', jwtAuth, (req, res, next) => {
	const {id} = req.params;
	const {notes} = req.body;

	return Player.findByIdAndUpdate({_id: id}, {$set: {notes}}, {new: true}).populate('user')
			.then(player=> {
				return res.status(201).json(player);
			})
			.catch(err => console.error(err));
})

router.put('/:id/team', jwtAuth, async (req, res, next) => {
	const {id} = req.params;
	const {team, player} = req.body;
	// console.log('the team is :' + team)
	// console.log('the id is :' + id)
	console.log(player, team)
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