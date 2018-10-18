'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Team} = require('../models/team');
const {Player} = require('../models/player');
const {Season} = require('../models/season');

const router = express.Router();
const jsonParser = bodyParser.json();

const passport = require('passport');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
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
const upload = multer({storage: storage}).single('logo');

router.get('/', jwtAuth, jsonParser, (req, res, next) => {
	return Team.find({})
		.then((data) => {
			return res.status(201).json(data);
		})
		.catch(err => console.error(err));
})

router.post('/', jwtAuth, upload, (req, res, next) => {
	const requiredFields = ['name', 'division'];
	const missingField = requiredFields.find(field => !(field in req.body));
	let logo = req.file.url;

	if (missingField) {
		return res.status(422).json({
			code: 422, 
			reason: 'ValidationError', 
			message: 'Missing field',
			location: missingField
		})
	}

	const stringFields = ['name', 'division'];
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

	let {name, division} = req.body;
	let team = '';
	name = name.trim();
	return Team.find({name, division})
			.count()
			.then(count => {
				if (count > 0) {
					return Promise.reject({
						code: 422, 
						reason: 'ValidationError',
						message: 'Team already exists',
						location: 'name'
					});
				}
			})
			.then(() => {
				return Team.create({
					name, division, logo, season: '5ba2bd394a76af4ad3ee4c3a'
				})
			})
			.then(_team => {
				team = _team;
				console.log(team)
				return Season.findByIdAndUpdate({_id: '5ba2bd394a76af4ad3ee4c3a'}, {$push: { teams: team._id }});
			})
			.then(() => {
				return res.status(201).json(team);
			})
			.catch(err => {
				if (err.reason === 'ValidationError') {
					return res.status(err.code).json(err);
				}
				res.status(500).json({code: 500, message: 'inteneral server error'});
			})
})

router.get('/standings', async (req, res) => {
	let standings = {};
	let temporaryTeamsList = {};
	let teams = await Team.find({});

	//create the function to sort all times by their division
	const groupBy = (list, sortBy) => {
		return list.reduce((acc, val) => {
			let key = val[sortBy];
			acc[key] = acc[key] || [];
			acc[key].push(val);
			return acc;
		}, {})
	}

	const byDivision = groupBy(teams, 'division');

	const calculateGamesBack = (first, second) => {
		return ((first.wins - first.losses) - (second.wins - second.losses)) / 2;
	}
	
	//sort the teams in their divisions, then add a games back field and actualy generate that number
	for (let field in byDivision) {
		temporaryTeamsList[field] = byDivision[field];
		temporaryTeamsList[field].sort((a, b) => b.wins - a.wins);

		let firstPlace = temporaryTeamsList[field][0];
		
		standings[field] = temporaryTeamsList[field].map(team => ({...team.toObject(), gamesBack: calculateGamesBack(firstPlace, team)}));
	}

	res.status(201).json(standings)
})

router.get('/:team', jsonParser, (req, res, next) => {
	const {team} = req.params;
	
	return Team.findOne({name: team}).populate('players')
			.then(data => {
				if (data) {
					res.status(201).json(data);
				} else {
					throw new Error('team is not found')
				}
			})
			.catch(err => console.error(err.message))
})

module.exports = {router};