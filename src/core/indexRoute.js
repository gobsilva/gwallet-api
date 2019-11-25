'use strict';

module.exports = (app, webconfig) => {
    app.get('/index', (req, res, next) => {
        res.status(200).send({
            name: webconfig.nameApi,
            version: webconfig.versionApi,
        });
    });
} 