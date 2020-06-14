const Courier = require('../models/Courier')

// Update the couriers
const updateCouriers = async (req, res) => {
  const { id, max_capacity, available_capacity } = req.body;

  const updatedCourier = {}
  if (id) {
    updatedCourier.id = id
  }
  if (max_capacity || max_capacity === 0) {
    updatedCourier.max_capacity = max_capacity;
  }
  if (available_capacity || available_capacity === 0) {
    updatedCourier.available_capacity = available_capacity;
  }

  try {
    let courier = await Courier.findOne({
      id: req.params.id,
    });

    if (!courier) return res.status(404).json({ msg: 'Courier is not found' });

    if ((
      updatedCourier.available_capacity > courier.max_capacity &&
      !(updatedCourier.available_capacity <= updatedCourier.max_capacity)) ||
      updatedCourier.max_capacity < updatedCourier.available_capacity
    )
      return res.status(404).json({
        msg: 'Courier available capacity should not exceed courier max capacity',
      });

    const filter = { id: req.params.id };
    const update = { $set: updatedCourier };

    courier = await Courier.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    res.json(courier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong on the server');
  }
}

// if pickup new courier, decreasing the requested available capacity
const pickupCouriers = async (req, res) => {
  const { decrease_available_capacity } = req.body;

  const updatedCourier = {};

  try {
    let courier = await Courier.findOne({
      id: req.params.id,
    });

    if (!courier) return res.status(404).json({ msg: 'Courier is not found' });

    if (decrease_available_capacity)
      updatedCourier.available_capacity =
        courier.available_capacity - decrease_available_capacity;

    if (updatedCourier.available_capacity < 0)
      return res
        .status(404)
        .json({ msg: 'Courier available capacity cannot be less than zero' });

    const filter = { id: req.params.id };
    const update = { $set: updatedCourier };

    courier = await Courier.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    res.json(courier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong on the server');
  }
}


// increasing the available capacity after the drop off the courier
const dropCouriers = async (req, res) => {
  const { increase_available_capacity } = req.body;

  const updatedCourier = {};

  try {
    let courier = await Courier.findOne({
      id: req.params.id,
    });

    if (!courier) return res.status(404).json({ msg: 'Courier not found' });

    if (increase_available_capacity)
      updatedCourier.available_capacity =
        courier.available_capacity + increase_available_capacity;

    if (updatedCourier.available_capacity > courier.max_capacity)
      return res.status(404).json({
        msg: 'Courier available capacity should not exceed courier max capacity',
      });

    const filter = { id: req.params.id };
    const update = { $set: updatedCourier };

    courier = await Courier.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    res.json(courier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong on the server');
  }
}

module.exports = { updateCouriers, pickupCouriers, dropCouriers }