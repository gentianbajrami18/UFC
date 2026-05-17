const mongoose = require('mongoose');

const connectDB = url => {
  if (!url) {
    throw new Error('MONGO_URL is missing from environment variables');
  }

  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 15000,
  });
};

module.exports = connectDB;
