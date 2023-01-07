const { Transaction } = require('../models');

const getTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      date: { $gte: +startDate, $lt: +endDate },
    })
      .sort('date')
      .populate('sender')
      .exec();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getTransactions,
};
