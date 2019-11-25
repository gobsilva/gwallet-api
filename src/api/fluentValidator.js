'use strict';

const erro = require('../api/error');

function ValidationContract() {

}

ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0 || Object.keys(value).length === 0) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.isValidNumber = (value, message) => {
    if (isNaN(value)) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.isLessThan = (value, limit, message) => {
    if (value < limit) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if (Object.keys(value).length != len) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.isEmail = (value, message) => {
    var re = /\S+@\S+\.\S+/;
    if (!re.test(value)) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.hasProperty = (value, properties = [], message) => {
    if (properties.length > 0) {
        properties.forEach((element) => {
            if (!value.hasOwnProperty(element)) {
                erro.status = 400;
                erro.message = message;
                throw erro;
            }
        });
    }
}

ValidationContract.prototype.notEquals = (value, value2 = [], message) => {
    let equal = false;

    value2.forEach(element => {
        if(element === value) {
            equal = true;
        }
    });

    if (!equal) {
        erro.status = 404;
        erro.message = message;
        throw erro;
    }
}

ValidationContract.prototype.StringEquals = (value, value2 = [], message) => {
    let equal = false;

    value2.forEach(element => {
        if(element != undefined)
            if(element.toUpperCase() === value.toUpperCase()) {
                equal = true;
            }
    });

    if (equal) {
        erro.status = 400;
        erro.message = message;
        throw erro;
    }
}

module.exports = ValidationContract;


