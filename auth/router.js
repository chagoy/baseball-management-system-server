
'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();
const moment = require('moment');
const crypto = require('crypto');

const {Player} = require('../models/player');
const {User} = require('../models/user');
const {Token} = require('../models/token');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
	
	if (req.user.admin) {
		return Player.find({})
			.populate('team')
			.populate('user')
			.then(data => {
				res.json(data);
			})
	} else {
		return Player.find({user: req.user.id})
			.populate('team')
			.then(data => {res.json(data)})
	}
});

router.post('/reset', async (req, res) => {
	//get the email
	const { email } = req.body
	console.log(req.body)
	const user = await User.findOne({ email });

	const secret = moment().toISOString();
	const verificationCode = crypto.createHmac('sha256', secret).update('kobe').digest('hex');

	return Token.create({user: user.id, hash: verificationCode})
		.then(token => {
			const msg = { 
				to: user.email,
				from: 'blah@mpk.com',
				subject: 'Information for your password reset',
				text: 'Did you forget your password? If so click here to reset your password and make it all better',
				html: `Did you forget your password? If so click <a href="/reset/${token.hash}">here</a> to reset your password and make it all better`
			};
			sgMail.send(msg);
			return res.status(201).json({"message": "Check your email for instructions to reset your password"})
		})
});

router.get('/reset/:hash', (req, res) => {
	const { hash } = req.params;
	
	return Token.findOne({hash})
			.then(token => {
				console.log(token)
				if (token) {
					if (token.validateToken()) {
						return res.status(201).json({"reset": true, "token": hash})
					}
				} else {
					let message = { "error": "Your password reset code has expired. Please try again."}
					return res.status(422).json(message)
				}
			})
			.catch(err => console.error(err))
});

router.post('/reset/:hash', (req, res) => {
	const { hash } = req.params;
	const { password } = req.body;
	return Token.findOne({hash})
			.then(token => {
				return User.hashPassword(password)
					.then(hashedPassword => {
						return User.findOneAndUpdate({_id: token.user}, {$set: { password: hashedPassword}})
					})
					.then(() => res.json({"success": "password changed"}))
			})
			.catch(err => console.error(err))
});

module.exports = {router};