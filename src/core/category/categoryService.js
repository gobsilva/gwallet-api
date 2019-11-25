'use strict';

const repository = require('./categoryRepository'),
    ValidationContract = require('../../api/fluentValidator'),
    contract = new ValidationContract();

module.exports = {
    getAllCategories,
    insertCategory,
    updateCategory,
    deleteCategory
};

async function getAllCategories(req) {
    let categories = await repository.getAllCategories();
    return categories;
}

async function insertCategory(req) {
    let categoryNames = await repository.getActualCategories();
    let categoryColors = await repository.getActualCategoriesColors();
    
    contract.isRequired(req.body, "Os dados da categoria são obrigatórios.");
    contract.hasProperty(req.body, ["name"], "O nome da categoria é obrigatório.");
    contract.hasProperty(req.body, ["color"], "A cor da categoria é obrigatória.");
    contract.StringEquals(req.body.name, categoryNames, "Nome de categoria informado já existe.");
    contract.StringEquals(req.body.color, categoryColors, "Cor de categoria informada já existe.");

    return await repository.insertCategory(req);
}

async function updateCategory(req) {
    contract.isRequired(req.params.id, "O id da categoria é obrigatório.");
    let actualCategory = await repository.getCategoryById(req.params.id);
    contract.isRequired(actualCategory, "Categoria não encontrada. ID: " + req.params.id);
    
    let categoryNames = await repository.getActualCategories(actualCategory.name);
    let categoryColors = await repository.getActualCategoriesColors(actualCategory.color);

    contract.StringEquals(req.body.name, categoryNames, "Nome de categoria informado já existe.");
    contract.StringEquals(req.body.color, categoryColors, "Cor de categoria informada já existe.");

    actualCategory.name = req.body.name ? req.body.name : actualCategory.name;
    actualCategory.color = req.body.color ? req.body.color : actualCategory.color;

    return await repository.updateCategory(actualCategory);
}

async function deleteCategory(req) {
    contract.isRequired(req.params.id, "O id da categoria é obrigatório.");
    let actualCategory = await repository.getCategoryById(req.params.id);
    contract.isRequired(actualCategory, "Categoria não encontrada. ID: " + req.params.id);
    
    return await repository.deleteCategory(actualCategory);
}