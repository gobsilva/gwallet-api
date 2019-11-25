'use strict';

module.exports = {
    findByCredential
};

async function findByCredential(id, tipo) {
    
    let login = {
        id: 1,
        name: 'Gurgel',
        photo: 'https://img-lojadomecanico.s3-sa-east-1.amazonaws.com/img/gurgel.jpg',
        celnumber: '+5516999999999',
        token: 'e6szl0pZ7w',
        email: 'gurgelmix@gurgelmix.com.br'
    }

    return login;
}