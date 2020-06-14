
const Courier = require('../models/Courier');

// Gets all couriers
const allCouriers = async (req, res) => {
  try {
    const couriers = await Courier.find({
      available_capacity: { $gt: 0 },
    }).sort({
      id: 1,
    });
    res.json(couriers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong on the server');
  }
}

module.exports = allCouriers
