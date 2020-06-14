const Courier = require('../models/Courier');

// Remove the courier if one exists
const removeCouriers = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        // Could log errors with Winston.
        res.status(500).send({ error: "Please provide the valid ID" });
    } else {
        try {
            const filter = { id: req.params.id };
            courier = await Courier.findOneAndRemove(filter);
            res.json(courier);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Something went wrong on the server');
        }
    }
}
module.exports = removeCouriers