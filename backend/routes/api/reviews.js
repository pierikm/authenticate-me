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
        },
        include: ['Users']
    });
    return res.json(reviews);
}));

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    console.log(req.body);
    const review = await db.Review.create(req.body);
    const newReview = await db.Review.findByPk(review.id, { include: ['User'] });
    return res.json(newReview);
}));

router.put('/:id', csrfProtection, asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const review = await db.Review.findByPk(id, { include: ['User'] });
    const updatedReview = await review.update(req.body);
    return res.json(updatedReview);
}));

router.delete('/:id', csrfProtection, asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const review = await db.Review.findByPk(id);
    console.log("**********", review);
    const userId = review.dataValues.userId;
    review.destroy();
    return res.json(userId);
}));

module.exports = router;
