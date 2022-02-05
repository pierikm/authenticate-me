const express = require('express');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');
const { rideValidator } = require('../../utils/rideValidation')

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const rides = await db.Ride.findAll({ include: ['Images'] });
    return res.json(rides);
}));

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const ride = await db.Ride.create(req.body);
    return res.redirect(`/rides`);
}))

module.exports = router;
