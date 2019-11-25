'use strict';

module.exports = function (req, res, next) {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, user.login, User-Agent, user.password, skiploading, skiperror, usuarioLogado");
    res.header("Access-Control-Allow-Methods", "POST,PUT,DELETE,GET,OPTIONS");

    if (req.method === 'OPTIONS') {
        res.status(200).send();
        return;
    }
    next();
};