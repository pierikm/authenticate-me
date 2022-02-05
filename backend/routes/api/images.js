const express = require('express');
const asyncHandler = require('express-async-handler');
const csrf = require('csurf');

const db = require('../../db/models');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const image = await db.Image.create(req.body);
    return res.json(image);
}));

module.exports = router;
