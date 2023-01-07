const mongoose = require('mongoose');

const dbURI = process.env.DB_URL || 'mongodb://localhost:27017/cibc';
mongoose.set('strictQuery', false);

const dbConnect = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected Successfully');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
