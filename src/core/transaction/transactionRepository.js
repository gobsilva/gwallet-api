'use strict';

module.exports = {
    getAllUserTransactions,
    getAccountBalance,
    insertTransaction,
    getActualDocuments,
    getActualEmails,
    gettransactionById
};

let transactions = [
    {
        id: 1,
        transactionValue: 100.00,
        receiverInformation: {
            id: 1,
            name: 'Gurgel'
        },
        senderInformation: {
            id: 2,
            name: 'Loja do Mecânico'
        },
        date: '18/11/2019 08:30:132',
        categoryInformation: {
            id: 5, name:'Usuário', color: '#000000'
        }
    },
    {
        id: 2,
        transactionValue: 50.00,
        receiverInformation: {
            id: 2,
            name: 'Loja do Mecânico'
        },
        senderInformation: {
            id: 1,
            name: 'Gurgel'
        },
        date: '18/11/2019 10:30:132',
        categoryInformation: {
            id: 2, name:'Loja de Ferramentas', color: '#ff6600'
        }
    },
    {
        id: 3,
        transactionValue: 30.00,
        receiverInformation: {
            id: 2,
            name: 'Loja do Mecânico'
        },
        senderInformation: {
            id: 1,
            name: 'Gurgel'
        },
        date: '18/11/2019 11:30:555',
        categoryInformation: {
            id: 2, name:'Loja de Ferramentas', color: '#ff6600'
        }
    }
];

async function getAllUserTransactions(id, filter = '') {
    //todas as movimentações em receiver indicam crédito.
    //todas as movimentações em sender indicam debito.
    
    if(filter && filter != '') {
        return filter == 'CD' 
        ? transactions.filter(element => {
            return element.receiverInformation.id == id;
        })
        : transactions.filter(element => {
            return element.senderInformation.id == id;
        }); 
    }

    //retorno todas as transações
    let allTransactions = transactions.filter(element => {
        return (element.receiverInformation.id == id || element.senderInformation.id == id);
    });

    if(allTransactions && allTransactions.length > 0) {
        allTransactions = allTransactions.map(element => {
            element.type = (element.receiverInformation.id == id) ? 'CD' : 'DB';
            return element;
        });
    }

    return allTransactions;
}

async function getAccountBalance(user) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let userDTO = {};

    let creditTransactions = await getAllUserTransactions(user.id, 'CD');
    let debitTransactions = await getAllUserTransactions(user.id, 'DB');

    let creditValue = (creditTransactions && creditTransactions.length > 0) 
        ? creditTransactions.map(element => element.transactionValue).reduce(reducer) : 0.00;
    let debitValue = (debitTransactions && debitTransactions.length > 0) 
        ? debitTransactions.map(element => element.transactionValue).reduce(reducer) : 0.00;

    userDTO.id = user.id;
    userDTO.name = user.name;
    userDTO.accountBalance = "R$ " + (creditValue-debitValue)

    return userDTO;
}

async function insertTransaction(req, receiver, sender, category) {
    transactions.push({
        id: (transactions[transactions.length - 1].id + 1),
        transactionValue: req.body.transactionValue,
        receiverInformation: receiver,
        senderInformation: sender,
        date: req.body.date,
        categoryInformation: category
    });

    return {statusCode: 201};
}

async function getActualDocuments(document = '') {
    return transactions.map(element => {
        if(element.document !== document)
            return element.document;
    });
}

async function getActualEmails(email = '') {
    return transactions.map(element => {
        if(element.email !== email)
            return element.email;
    });
}

async function gettransactionById(id) {
    const found = transactions.find(element => element.id == id);
    return found;
}