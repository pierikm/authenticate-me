const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');
const { rideValidator } = require('../../utils/rideValidation')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const rides = await db.Ride.findAll({ include: ['Images'] });
    return res.json(rides);
}));

router.post('/', asyncHandler(async (req, res) => {
    const ride = await db.Ride.create(req.body);
    return res.redirect(`${req.baseUrl}/${ride.id}`);
}))

module.exports = router;
