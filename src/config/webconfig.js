'use strict';

const api = require('../../package.json');

module.exports = {
    apiRequestTimeout: 20000,
    nameApi: api['name'],
    versionApi: api['version'],
    urlApi: "http://localhost",
    portApi: 3000
};
