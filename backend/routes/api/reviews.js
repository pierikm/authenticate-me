const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const { rideId } = Number(req.params.body)
    const reviews = await db.Review.findAll({
        where: {
            rideId: rideId
        }
    });
    return res.json(reviews);
}));

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    console.log(req.body);
    const review = await db.Review.create(req.body);
    return res.json(review);
}));

module.exports = router;
