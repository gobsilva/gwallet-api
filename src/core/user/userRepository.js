'use strict';

module.exports = {
    getAllUsers,
    insertUser,
    updateUser,
    getActualDocuments,
    getActualEmails,
    getUserById
};

let users = [
    {
        id: 1,
        name: 'Thiago Gurgel',
        document: '1234567890',
        photo: 'https://img-lojadomecanico.s3-sa-east-1.amazonaws.com/img/gurgel.jpg',
        celnumber: '+5516999999999',
        token: 'e6szl0pZ7w',
        email: 'gurgelmix@gurgelmix.com.br',
        bankInformation: {
            bank: 'Santander',
            sortCode: '1234',
            account: '12345-6',
            operation: 'CC'
        },
        category: {
            id: 5, 
            name:'Usuário', 
            color: '#000000'
        }
    },
    {
        id: 2,
        name: 'Loja do Mecânico',
        document: '123456789012',
        photo: 'http://img.lojadomecanico.com.br/imagens_sitenovo/iconLogo.png',
        celnumber: '+5516999998888',
        token: 'fhvFOeXftY',
        email: 'ldm@gurgelmix.com.br',
        bankInformation: {
            bank: 'Banco do Brasil',
            sortCode: '5678',
            account: '67890-1',
            operation: 'CP'
        },
        category: {
            id: 2, 
            name:'Loja de Ferramentas', 
            color: '#ff6600'
        }
    }
];

async function getAllUsers() {
    return users;
}

async function insertUser(req, categorySend) {
    users.push({
        id: (users[users.length - 1].id + 1), 
        name: req.body.name,
        document: req.body.document,
        photo: req.body.photo, 
        celnumber: req.body.celnumber,
        token: req.body.token,
        email: req.body.email,
        bankInformation: {
            bank: req.body.bankInformation.bank,
            sortCode: req.body.bankInformation.sortCode,
            account: req.body.bankInformation.account,
            operation: req.body.bankInformation.operation
        },
        category: categorySend
    });

    return {statusCode: 201};
}

async function updateUser(user) {

    const index = users.findIndex((e) => e.id === user.id);
    users[index] = user;
    return user;
}

async function getActualDocuments(document = '') {
    return users.map(element => {
        if(element.document !== document)
            return element.document;
    });
}

async function getActualEmails(email = '') {
    return users.map(element => {
        if(element.email !== email)
            return element.email;
    });
}

async function getUserById(id) {
    const found = users.find(element => element.id == id);
    return found;
}