  
const mongoose = require('mongoose');

// Defining courier schema
const CourierSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  max_capacity: {
    type: Number,
    required: true,
  },
  available_capacity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('courier', CourierSchema);