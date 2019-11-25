'use strict';

const transactionController = require("./transactionController");

module.exports = [
    {
        verbo: "get",
        rota: "/gwallet/v1/user/:id/transactions",
        metodo: transactionController.getAllUserTransactions,
        public: true
    },
    {
        verbo: "post",
        rota: "/gwallet/v1/transactions",
        metodo: transactionController.insertTransaction,
        public: true
    }
];
