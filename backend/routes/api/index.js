const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const ridesRouter = require('./rides.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/rides', ridesRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
