const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const {
  Types: { Long },
} = mongoose;

const Schema = mongoose.Schema;
const transactionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Long,
      get: (value) => value.toString(),
    },
    recipient: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      accountNumber: { type: Number },
      bank: { type: String },
    },
    Amount: {
      type: mongoose.Types.Decimal128,
      get: (value) => value.toString(),
    },
    CurrencyCd: {
      type: String,
    },
    Comments: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { getters: true } },
);
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
