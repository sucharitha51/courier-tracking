const mongoose = require('mongoose');
const config = require('../config/dev');

// Mongodb connection
const mongoConnect = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = mongoConnect;