'use strict';

const transactionService = require('./transactionService');

module.exports = {
    getAllUserTransactions,
    insertTransaction
}

async function getAllUserTransactions(req) {
    return await transactionService.getAllUserTransactions(req);
}

async function insertTransaction(req) {
    return await transactionService.insertTransaction(req);
}