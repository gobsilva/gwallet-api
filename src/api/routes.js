'use strict';

const fs = require("fs"),
    content = require("./content");

module.exports = (app) => {
    fs.readdir("src/core/", (err, files) => {
        files.forEach(element => {
            const path = `src/core/${element}/${element}Route.js`;
            if (fs.existsSync(path)) {
                require(`../core/${element}/${element}Route`).map(func => {
                    app[func.verbo](func.rota, api(func.metodo));
                });
            }
        });
    });
};

function api(metodo) {
    return async (req, res) => {
        try {
            var page = Number(req.query.page ? req.query.page : 1),
                limit = Number(req.query.limit ? req.query.limit : 500),
                offset = page * limit - limit;
            let ret = await metodo(req);
            return content(res, ret);
        } catch (err) {
            err.error = err.error && (typeof err.error == 'string') ? JSON.parse(err.error) : err.error;
            err.errorCode = err ? err.status || err.errorCode || err.statusCode || 500 : 500;
            return content(res, err.error ? err.error : err);
        }
    };
}