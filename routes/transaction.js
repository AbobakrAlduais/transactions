const express = require('express');
const { getTransactions, getTransactionById } = require('../controllers');

const transactionRouter = express.Router();

transactionRouter.get('/', getTransactions);
transactionRouter.get('/:id', getTransactionById);

module.exports = transactionRouter;
