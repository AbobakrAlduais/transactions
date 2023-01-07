const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    IDNumber: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
  },
  { timestamps: true },
);
const User = mongoose.model('User', userSchema);
module.exports = User;
