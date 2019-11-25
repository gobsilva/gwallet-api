'use strict';

const userService = require('./userService');

module.exports = {
    getAllUsers,
    getAccountBalance,
    insertUser,
    updateUser
}

async function getAllUsers(req) {
    return await userService.getAllUsers(req);
}

async function getAccountBalance(req) {
    return await userService.getAccountBalance(req);
}

async function insertUser(req) {
    return await userService.insertUser(req);
}

async function updateUser(req) {
    return await userService.updateUser(req);
}