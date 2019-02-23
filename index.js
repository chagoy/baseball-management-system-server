'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const {User} = require('./models/user');
const path = require('path');

require ('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_KEY);

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const bodyParser = require('body-parser');

const app = express();

const { router: usersRouter } = require('./routes/users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: playersRouter } = require('./routes/players');
const { router: teamsRouter } = require('./routes/teams');
const { router: seasonsRouter } = require('./routes/seasons')
const { router: gamesRouter } = require('./routes/games');
const { router: postsRouter } = require('./routes/posts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

// app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   if (req.method === 'OPTIONS') {
//     return res.send(204);
//   }
//   next();
// });

app.use(cors())

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/players/', playersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/api/seasons/', seasonsRouter);
app.use('/api/games/', gamesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/auth/', authRouter);

//check if user.players > 0
//if true, price should be -15
//if not true price = price

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

app.post('/api/stripe', jwtAuth, async (req, res) => {
  
  if (!req.user.admin) {
    try {
      const token = req.body.token;
      console.log(token.id)
      let {status} = await stripe.charges.create({
          amount: req.user.price * 100,
          // amount: price,
          currency: 'usd',
          description: 'mpk baseball registration',
          statement_descriptor: 'spring 2019',
          source: token.id
      });

      res.json({status});
    } catch (err) {
      console.error(err)
      res.status(500).json(err).end();
    }
  } else {
    console.log('hello admin')
    res.status(201).json({message: 'you are admin, no need to pay'})
  }
});

// Serve any static files built by React
// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };

