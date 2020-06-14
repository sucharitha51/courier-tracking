
const Courier = require('../models/Courier');
const { check, validationResult } = require('express-validator');

// Add courier to the database when required parameters are not empty
const addCourier = async (req, res, next) => {

  [
    [
      check('id', 'Courier ID is required').not().isEmpty(),
      check('max_capacity', 'Max capacity is required').not().isEmpty(),
      check('available_capacity', 'Available capacity is required')
        .not()
        .isEmpty(),
    ],
  ]

  // return the response if there are any validation errors in the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, max_capacity, available_capacity } = req.body;

  try {
    // checking if the courier already exists
    let courier = await Courier.findOne({
      id: req.body.id,
    });

    if (courier)
      return res.status(404).json({ msg: 'Courier already exists' });

    if (max_capacity < available_capacity)
      return res
        .status(404)
        .json({ msg: 'Available capacity can\'t be more than max capacity' });

    const newCourier = new Courier({
      id,
      max_capacity,
      available_capacity,
    });

    courier = await newCourier.save();

    res.json(courier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong on the server');
  }

};

module.exports = addCourier;