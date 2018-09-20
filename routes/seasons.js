'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const {Season} = require('../models/season')

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true});

router.get('/', jwtAuth, (req, res) => {
	if (req.user.admin) {
		return Season.find({})
				.populate('teams')
				.populate('players')
				// .populate('games')
				.then(season => res.json(season))
	} else {
		return Season.find({}).populate('teams').populate('games')
			.then(season => {
				res.json(season);
			})
	}
})

router.post('/', jwtAuth, jsonParser, (req, res, json) => {
	const requiredFields = ['season', 'year'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		return res.status(422).json({
			code: 422, 
			reason: 'ValidationError',
			message: 'Missing Field',
			location: missingField
		})
	}

	let { season, year } = req.body;
	season = season.trim();

	return Season.find({season, year})
				.count()
				.then(count => {
					if (count > 0) {
						return Promise.reject({
							code: 422, 
							reason: 'ValidationError',
							message: 'This season already exists',
							location: 'Season'
						});
					}
				})
				.then(() => {
					return Season.create({
						season, year
					})
				})
				.then(season => {
					console.log('created a season')
					return res.status(201).json(season);
				})
				.catch(err => {
					if (err.reason === 'ValidationError') {
						return res.status(err.code).json(err);
					}
					res.status(500).json({code: 500, message: 'internal server error'});
				})
})

module.exports = { router };