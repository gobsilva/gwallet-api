'use strict';

module.exports = {
    getAllCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
    getActualCategories,
    getActualCategoriesColors,
    getCategoryById
};

let categories = [
    {id: 1, name:'Educação', color: '#00F'}, //azul
    {id: 2, name:'Loja de Ferramentas', color: '#ff6600'}, //laranja LDM
    {id: 3, name:'Saúde', color: '#257605'}, //verde
    {id: 4, name:'Supermercados', color: '#dcbf20'}, //amarelo
    {id: 5, name:'Usuário', color: '#000000'}, //preto
];

async function getAllCategories() {
    return categories;
}

async function insertCategory(req) {
    categories.push({id: (categories[categories.length - 1].id + 1), name: req.body.name, color: req.body.color});
    return {statusCode: 201};
}

async function updateCategory(category) {

    const index = categories.findIndex((e) => e.id === category.id);
    categories[index] = category;
    return category;
}

async function deleteCategory(category) {
    const index = categories.findIndex((e) => e.id === category.id);
    categories.splice(index, 1);
    return {statusCode: 204};
}

async function getActualCategories(name = '') {
    return categories.map(element => {
        if(element.name !== name)
            return element.name;
    });
}

async function getActualCategoriesColors(color = '') {
    return categories.map(element => {
        if(element.color !== color)
        return element.color;
    });
}

async function getCategoryById(id) {
    const found = categories.find(element => element.id == id);
    return found;
}