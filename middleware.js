const { errorResponse, internalErrorResponse } = require('./utils/response.utils');
const { requiredFieldsSchema, ruleFieldSchema } = require('./validator')

function checkValidPayload(req, res, next) {
    try {
        if(req.headers['content-type']==='application/json'){
            return next()
        }
        errorResponse({ message: 'Invalid JSON payload passed.', res })
    }
    catch(error){
        internalErrorResponse({ data: error.details, res })
    }
}

async function requiredFields(req, res, next) {
    try {
        const values = await requiredFieldsSchema.validateAsync(req.body, {
            escapeHtml: true
        });
        req.body = values;
        return next()
    }
    catch (error) {
        errorResponse({message: error.details[0].message+".", res})
    }
}

function checkForSpecifiedField(req, res, next) {
    try{
        const field = req.body.rule.field
        if(req.body.data.toString() === '[object Object]' && field in req.body.data) {
            return next()
        } else if(Array.isArray(req.body.data) && req.body.data.includes(field)) {
            return next()
        } else if(typeof(req.body.data) === 'string' && field < req.body.data.length) {
            return next()
        }
        errorResponse({ message: `field ${field} is missing from data.`, res })
    }
    catch(error){
        internalErrorResponse({ data: error.details, res })
    }
}

function ruleFieldValidation(req, res, next){
    try{
        const selectedField = req.body.rule.field
        const condition = req.body.rule.condition
        const fieldValue = req.body.data[selectedField]
        const conditionValue = req.body.rule.condition_value
        if (ruleFieldSchema(fieldValue, condition, conditionValue)) {
            return next()
        }
        const validationDetails = {
            error: true,
            field: selectedField,
            field_value: fieldValue,
            condition: req.body.rule.condition,
            condition_value: req.body.rule.condition_value
        }
        errorResponse({ message: `field ${selectedField} failed validation.`, data: { validation: validationDetails }, res })
    }
    catch(error){
        internalErrorResponse({ data: error.details, res })
    }
}


module.exports = { checkValidPayload, requiredFields, checkForSpecifiedField, ruleFieldValidation } 