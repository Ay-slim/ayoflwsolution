// Connects the app gateway (index.js) to the two endpoints.

const validationRouter = require('./validation.router');
const baseRouter = require('./base.router')
const indexRouter = [baseRouter, validationRouter];
module.exports = indexRouter