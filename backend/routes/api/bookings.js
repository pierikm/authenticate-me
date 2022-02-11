const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.delete('/:id', csrfProtection, asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    db.Booking.destroy({ where: { id } });
    return res.json(id);
}))

module.exports = router;
