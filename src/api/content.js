'use strict';

const webconfig = require("../config/webconfig");

module.exports = (res, obj) => {
  if (obj.errorCode) {
    return res.status(obj.errorCode).send(getError(obj, obj.errorCode));
  }
  if (obj.records) {
    obj = obj.records;
  }

  if(obj.statusCode)
    return res.status(obj.statusCode).send();
  else
    return res.status(200).send(getContent(obj));

};

function getContent(obj) {
  let meta = {
    server: webconfig.nameApi,
    count: obj.count ? obj.count : 0,
    limit: obj.pg ? obj.pg.limit || 100 : 100,
    offset: obj.pg ? obj.pg.offset || 0 : 0,
    page: obj.pg ? obj.pg.page || 1 : 0
  };
  meta.pageCount = Math.floor(meta.count / meta.limit);
  return {
    meta: meta,
    records: getList(obj)
  };
}

function getList(obj) {
  if (obj.rows) obj = obj.rows;
  if (obj.length) return obj;
  return obj;
}

function getError(obj, errorCode) {
  return {
    developerMessage: obj.message || obj.developerMessage || obj.userMessage,
    userMessage: obj.userMessage
      ? obj.userMessage
      : "Ops, ocorreu um erro inesperado! =( ",
    errorCode: errorCode
  };
}


