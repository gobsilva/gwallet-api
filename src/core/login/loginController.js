'use strict';

const loginService = require('./loginService');

module.exports = {
    findByCredential
}

async function findByCredential(req) {
    return await loginService.findByCredential(req);
}