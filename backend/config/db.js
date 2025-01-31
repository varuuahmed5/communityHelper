const mongoose = require('mongoose');

const dbConfig = () => {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.log('MongoDB connection failed', err);
    });
};

module.exports = dbConfig;
