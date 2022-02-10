const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

router.get('/:id/bookings', csrfProtection, asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const bookings = await User.findByPk(id, { include: ['Bookings', 'Rides'] })
    return res.json(bookings);
}));

router.post('/:id/bookings', csrfProtection, asyncHandler(async (req, res) => {
    const booking = await Booking.create(req.body);
    return res.json(booking);
}));

module.exports = router;
