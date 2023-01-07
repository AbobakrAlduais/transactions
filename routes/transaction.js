const express = require('express');
const { getTransactions } = require('../controllers');

const transactionRouter = express.Router();

transactionRouter.get('/', getTransactions);

module.exports = transactionRouter;
