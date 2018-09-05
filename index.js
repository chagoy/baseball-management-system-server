'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
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
const teamsRouter = require('./routes/teams');

app.use(bodyParser.json());

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

app.use(cors({
  origin: '*'
}))

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/players/', playersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/auth/', authRouter);

app.post('/api/stripe', async (req, res) => {
  // console.log(req.body);
  try {
    let {status} = await stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        description: 'an example charge',
        source: req.body.token.id
    });
    console.log(status);
    res.json({status});
  } catch (err) {
    res.status(500).json(err).end();
  }
});

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
