const express = require('express');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const image = await db.Image.create(req.body);
    console.log("***********", image.dataValues.rideId)
    const ride = await db.Ride.findByPk(image.dataValues.rideId, { include: ['Images', 'Bookings', 'Reviews'] })
    return res.json(ride);
}));

router.delete('/:id', csrfProtection, asyncHandler(async (req, res) => {
    const imageId = Number(req.params.id);
    db.Image.destroy({ where: { id: imageId } });
    return imageId;
}));

module.exports = router;
