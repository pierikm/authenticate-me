const express = require('express');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const booking = await db.Booking.create(req.body);
    return res.json(booking);
}))

module.exports = router;
