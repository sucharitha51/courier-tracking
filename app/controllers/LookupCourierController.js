const Courier = require('../models/Courier');

// lookup the couriers with the required capacity
const lookupCouriers = async (req, res) => {
  try {
    const couriers = await Courier.find({
      available_capacity: { $gte: req.body.capacity_required },
    }).sort({
      id: 1,
    });
    res.json(couriers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong on the server');
  }
}
module.exports = lookupCouriers
