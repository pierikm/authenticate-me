const { check } = require('express-validator');

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
        .withMessage("Pleae name your ride")
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

module.exports = rideValidator;
