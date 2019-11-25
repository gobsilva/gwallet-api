'use strict';

const repository = require('./userRepository'),
    categoryRepository = require('../category/categoryRepository'),
    transactionRepository = require('../transaction/transactionRepository'),
    ValidationContract = require('../../api/fluentValidator'),
    contract = new ValidationContract();

module.exports = {
    getAllUsers,
    getAccountBalance,
    insertUser,
    updateUser
};

async function getAllUsers(req) {
    let Users = await repository.getAllUsers();
    return Users;
}

async function getAccountBalance(req) {
    contract.isRequired(req.params.id, "O id do usuário é obrigatório.");
    let actualUser = await repository.getUserById(req.params.id);
    contract.isRequired(actualUser, "Usuário não encontrado. ID: " + req.params.id);
    
    let accountBalance = await transactionRepository.getAccountBalance(actualUser);
    return accountBalance;
}

async function insertUser(req) {
    let userDocuments = await repository.getActualDocuments();
    let userEmails = await repository.getActualEmails();

    contract.isRequired(req.body, "Os dados de usuário são obrigatórios.");
    contract.isRequired(req.body.bankInformation, "Os dados bancários são obrigatórios.");
    contract.hasProperty(req.body, ["name"], "O nome de usuário é obrigatório.");
    contract.hasProperty(req.body, ["document"], "O documento (CPF/CNPJ) do usuário é obrigatório.");
    contract.hasProperty(req.body, ["celnumber"], "O número de celular do usuário é obrigatório.");
    contract.hasProperty(req.body, ["email"], "O e-mail do usuário é obrigatório.");
    contract.hasProperty(req.body.bankInformation, ["bank"], "O nome da instituição (Banco) é obrigatório.");
    contract.hasProperty(req.body.bankInformation, ["sortCode"], "O número da agência é obrigatório.");
    contract.hasProperty(req.body.bankInformation, ["account"], "O número da conta é obrigatório.");
    contract.hasProperty(req.body.bankInformation, ["operation"], "A operação (CC, CP, CS) é obrigatória.");
    contract.hasProperty(req.body, ["idCategory"], "O categoria di usuário é obrigatória.");
    contract.isValidNumber(req.body.idCategory, 'O ID da categoria não é um número válido.');
    let category = await categoryRepository.getCategoryById(req.body.idCategory);
    contract.isRequired(category, 'Categoria não encontrada. ID: ' + req.body.idCategory);
    contract.StringEquals(req.body.document, userDocuments, "Já existe cadastro para o Documento informado.");
    contract.StringEquals(req.body.email, userEmails, "Já existe cadastro para o e-mail informado.");

    return await repository.insertUser(req, category);
}

async function updateUser(req) {
    contract.isRequired(req.params.id, "O id do usuário é obrigatório.");
    let actualUser = await repository.getUserById(req.params.id);
    contract.isRequired(actualUser, "Usuário não encontrado. ID: " + req.params.id);

    if(req.body.idCategory) {
        var category = await categoryRepository.getCategoryById(req.body.idCategory);
        contract.isRequired(category, "Categoria não encontrado. ID: " + req.body.idCategory);
    }
    
    actualUser.name = req.body.name ? req.body.name : actualUser.name;
    actualUser.photo = req.body.photo ? req.body.photo : actualUser.photo;
    actualUser.celnumber = req.body.celnumber ? req.body.celnumber : actualUser.celnumber;
    actualUser.token = req.body.token ? req.body.token : actualUser.token;
    if(category)
        actualUser.category = category;

    if(req.body.bankInformation) {
        actualUser.bankInformation.bank = req.body.bankInformation.bank ? req.body.bankInformation.bank : actualUser.bankInformation.bank;
        actualUser.bankInformation.sortCode = req.body.bankInformation.sortCode ? req.body.bankInformation.sortCode : actualUser.bankInformation.sortCode;
        actualUser.bankInformation.account = req.body.bankInformation.account ? req.body.bankInformation.account : actualUser.bankInformation.account;
        actualUser.bankInformation.operation = req.body.bankInformation.operation ? req.body.bankInformation.operation : actualUser.bankInformation.operation;
    }

    return await repository.updateUser(actualUser);
}