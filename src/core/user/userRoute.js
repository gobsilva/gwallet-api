'use strict';

const userController = require("./userController");

module.exports = [
    {
        verbo: "get",
        rota: "/gwallet/v1/users",
        metodo: userController.getAllUsers,
        public: true
    },
    {
        verbo: "get",
        rota: "/gwallet/v1/user/:id/accountbalance",
        metodo: userController.getAccountBalance,
        public: true
    },
    {
        verbo: "post",
        rota: "/gwallet/v1/users",
        metodo: userController.insertUser,
        public: true
    },
    {
        verbo: "put",
        rota: "/gwallet/v1/users/:id",
        metodo: userController.updateUser,
        public: true
    }
];
