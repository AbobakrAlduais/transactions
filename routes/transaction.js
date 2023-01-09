const express = require('express');
const { getTransactions, getTransactionById, updateComments } = require('../controllers');

const transactionRouter = express.Router();

transactionRouter.get('/', getTransactions);
transactionRouter.get('/:id', getTransactionById);
transactionRouter.patch('/:id', updateComments);

module.exports = transactionRouter;
