'use strict';

const loginController = require("./loginController");

module.exports = [
    {
        verbo: "post",
        rota: "/gwallet/v1/login",
        metodo: loginController.findByCredential,
        public: true
    }
];
