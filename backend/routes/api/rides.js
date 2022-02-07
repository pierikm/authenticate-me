const express = require('express');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const rides = await db.Ride.findAll({ include: ['Images'] });
    return res.json(rides);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const rideId = Number(req.params.id)
    const ride = await db.Ride.findByPk(rideId, { include: ['Images'] });
    return res.json(ride);
}));

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const ride = await db.Ride.create(req.body);
    return res.json(ride);
}));

router.put('/:id', csrfProtection, asyncHandler(async (req, res) => {
    const rideId = Number(req.params.id)
    const ride = await db.Ride.findByPk(rideId, { include: ['Images'] });
    const updatedRide = await ride.update(req.body);
    return res.json(updatedRide);
}));

router.delete('/:id', csrfProtection, asyncHandler(async (req, res) => {
    const rideId = Number(req.params.id);
    db.Ride.destroy({ where: { id: rideId } });
    return res.json(rideId);
}))

module.exports = router;
