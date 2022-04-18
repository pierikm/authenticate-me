const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

const rideValidator = [
    check('userId')
        .notEmpty()
        .isInt({ min: 0 }),
    check('location')
        .notEmpty()
        .withMessage("Please provide a location")
        .isLength({ max: 100 })
        .withMessage("Location can be no more than 100 characters"),
    check('name')
        .notEmpty()
        .withMessage("Please name your ride")
        .isLength({ max: 255 })
        .withMessage("Name can be no more than 255 characters"),
    check('description')
        .notEmpty()
        .withMessage('Describe your ride')
        .isLength({ max: 1000 })
        .withMessage("describe your ride with less than 1001 words"),
    check('price')
        .notEmpty()
        .withMessage('How much does your ride cost?')
        .isDecimal({ max: 9999999999.99 })
        .withMessage('No ride costs that much on this app')
        .isDecimal({ min: 1.00 })
        .withMessage('Rides must cost at least $1.00'),
    check('speed')
        .notEmpty()
        .withMessage('How fast is your ride?')
        .isInt({ max: 670600000 })
        .withMessage('Rides cannot travel faster than light')
        .isInt({ min: 0 })
        .withMessage('Rides with zero speed aren\'t really rides'),
    check('travelType')
        .notEmpty()
        .withMessage('Please select how your ride goes')
]

router.get('/', asyncHandler(async (req, res) => {
    const rides = await db.Ride.findAll({ include: ['Images'] });
    return res.json(rides);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const rideId = Number(req.params.id)
    const ride = await db.Ride.findByPk(rideId, { include: ['Images', 'Bookings', 'Reviews'] });
    return res.json(ride);
}));

router.post('/', rideValidator, csrfProtection, asyncHandler(async (req, res) => {
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
