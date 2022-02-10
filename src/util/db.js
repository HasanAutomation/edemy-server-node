const mongoose = require('mongoose');

module.exports = async function connectDB() {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO connected ${result.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
