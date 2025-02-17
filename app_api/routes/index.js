const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms:["HS256"]
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripList)
    //.post(tripsController.tripsAddTrip);
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    //.put(tripsController.tripsUpdateTrip);
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;