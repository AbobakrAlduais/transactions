const { Transaction } = require('../models');

const getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    let filter = { date: { $gte: +startDate, $lte: +endDate } };
    if (status) {
      filter = { ...filter, ...{ status: { $in: status.split(',') } } };
    }

    const transactions = await Transaction.find(filter)
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

const updateComments = async (req, res) => {
  const { id } = req.params;
  const { Comments } = req.body;
  try {
    const doc = await Transaction.findOneAndUpdate(
      { _id: id },
      { Comments },
      { new: true, projection: { _id: 1, id: 1, Comments: 1, date: 1 } },
    );
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  updateComments,
};
