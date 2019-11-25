'use strict';

const repository = require('./loginRepository'),
    ValidationContract = require('../../api/fluentValidator'),
    contract = new ValidationContract();

module.exports = {
    findByCredential
};

async function findByCredential(req) {
    validate(req);

    let login = await repository.findByCredential(req);
    return login;
}

function validate() {
    contract.isRequired(req.body, "Os dados de acesso são obrigatórios.");
    contract.hasProperty(req.body, ["credential"], "A credencial é obrigatória.");
    contract.hasProperty(req.body, ["password"], "A senha é obrigatória.");
    contract.notEquals(req.body.credential, ['gurgelmix@gurgelmix.com.br', '12345678901', '123456789012'], "Usuário não encontrado.");
    contract.notEquals(req.body.password, ['123456'], "Usuário não encontrado.");
}