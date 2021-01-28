const validationRouter = require('./validation.router');
const baseRouter = require('./base.router')
const indexRouter = [baseRouter, validationRouter];
module.exports = indexRouter