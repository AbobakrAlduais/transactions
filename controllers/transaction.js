const { Transaction } = require('../models');

const getTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      date: { $gte: +startDate, $lte: +endDate },
    })
      .select('_id id date Comments')
      .sort('date')
      .exec();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Transaction.findById(id, '_id id date Comments');
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
};
