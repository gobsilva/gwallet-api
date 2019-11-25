'use strict';

const categoryService = require('./categoryService');

module.exports = {
    getAllCategories,
    insertCategory,
    updateCategory,
    deleteCategory
}

async function getAllCategories(req) {
    return await categoryService.getAllCategories(req);
}

async function insertCategory(req) {
    return await categoryService.insertCategory(req);
}

async function updateCategory(req) {
    return await categoryService.updateCategory(req);
}

async function deleteCategory(req) {
    return await categoryService.deleteCategory(req);
}