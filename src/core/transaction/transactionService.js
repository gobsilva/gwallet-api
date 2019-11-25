'use strict';

const repository = require('./transactionRepository'),
    categoryRepository = require('../category/categoryRepository'),
    userRepository = require('../user/userRepository'),
    ValidationContract = require('../../api/fluentValidator'),
    contract = new ValidationContract();

module.exports = {
    getAllUserTransactions,
    insertTransaction
};

async function getAllUserTransactions(req) {
    contract.isRequired(req.params.id, "O ID do usuário é obrigatório.");

    let transactions = await repository.getAllUserTransactions(req.params.id, req.query.type);
    return transactions;
}

async function insertTransaction(req) {
    contract.isRequired(req.body, "Os dados da transação são obrigatórios.");
    contract.hasProperty(req.body, ["transactionValue"], "O valor da transação é obrigatório.");
    contract.hasProperty(req.body, ["idReceiver"], "O ID do usuário recebedor é obrigatório.");
    contract.hasProperty(req.body, ["idSender"], "O ID do usuário remetente é obrigatório.");
    contract.hasProperty(req.body, ["idCategory"], "O ID da categoria é obrigatório.");
    contract.isValidNumber(req.body.transactionValue, 'O valor da transação não é um valor valido');
    contract.isLessThan(req.body.transactionValue, 1, 'O valor da transação não pode ser inferior a 1 real.');
    contract.isValidNumber(req.body.idReceiver, 'O ID do usuário recebedor não é um número valido');
    contract.isValidNumber(req.body.idSender, 'O ID do usuário remetende não é um número valido');
    contract.isValidNumber(req.body.idCategory, 'O ID da categoria não é um número valido');

    let receiver = await userRepository.getUserById(req.body.idReceiver);
    contract.isRequired(receiver, 'Usuário recebedor não encontrado. ID: ' + req.body.idReceiver);

    let sender = await userRepository.getUserById(req.body.idSender);
    contract.isRequired(sender, 'Usuário remetente não encontrado. ID: ' + req.body.idSender);

    let category = await categoryRepository.getCategoryById(req.body.idCategory);
    contract.isRequired(category, 'Categoria não encontrada. ID: ' + req.body.idCategory);

    let ac = await repository.getAccountBalance(sender);
    console.log(ac.accountBalance);
    
    contract.isLessThan(Number(ac.accountBalance.replace('R$ ', '')), req.body.transactionValue, 'O usuário remetente não possui saldo disponível para efetuar a transação.');

    return await repository.insertTransaction(req, returnReceiverDTO(receiver), returnSenderDTO(sender), category);
}

function returnReceiverDTO(receiver) {
    let receiverDTO = {};
    receiverDTO.id = receiver.id;
    receiverDTO.name = receiver.name;

    return receiverDTO;
}

function returnSenderDTO(sender) {
    let senderDTO = {};
    senderDTO.id = sender.id;
    senderDTO.name = sender.name;

    return senderDTO;
}