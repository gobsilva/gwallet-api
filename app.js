'use strict';

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    webconfig = require('./src/config/webconfig');

(async () => {
    try {
        app.use(require('./src/api/cors'));
        app.use(bodyParser.json({ limit: '500mb' }));
        app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

        require('./src/core/indexRoute')(app, webconfig);
        require('./src/api/routes')(app);

        app.listen(webconfig.portApi, () => {
            console.log(`[${webconfig.nameApi}] - Ativo | ${webconfig.urlApi}:${webconfig.portApi}`);
        });

    } catch (error) {
        console.log(error.message);
    }
})();