const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    // console.log('1******************************************************************************')
    const rides = await db.Ride.findAll();
    // console.log(rides);
    return res.json(rides);
}));

module.exports = router;
