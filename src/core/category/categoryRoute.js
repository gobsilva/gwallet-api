'use strict';

const categoryController = require("./categoryController");

module.exports = [
    {
        verbo: "get",
        rota: "/gwallet/v1/categories",
        metodo: categoryController.getAllCategories,
        public: true
    },
    {
        verbo: "post",
        rota: "/gwallet/v1/categories",
        metodo: categoryController.insertCategory,
        public: true
    },
    {
        verbo: "put",
        rota: "/gwallet/v1/categories/:id",
        metodo: categoryController.updateCategory,
        public: true
    },
    {
        verbo: "delete",
        rota: "/gwallet/v1/categories/:id",
        metodo: categoryController.deleteCategory,
        public: true
    }
];
