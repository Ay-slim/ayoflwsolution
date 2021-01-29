// Router for the POST endpoint. Routes request through all the middleware.

const express = require('express');
const validationRouter = express();
const { okResponse, internalErrorResponse } = require('../utils/response.utils')
const { requiredFields, checkForSpecifiedField, ruleFieldValidation } = require('../middleware')

  /**
 * Final handler for /validate-rule route.
 * @param {*} req request object
 * @param {*} res response object
 */
function validationController (req, res) {
    try{
        const field = req.body.rule.field
        const validatedDetails = {
            error: false,
            field: field,
            field_value: req.body.data[field],
            condition: req.body.rule.condition,
            condition_value: req.body.rule.condition_value
        }
        okResponse({ message: `field ${field} successfully validated.`, data: { validation: validatedDetails }, res })
    }
    catch(error) {
        internalErrorResponse({ data: error.details, res })
    }
}

validationRouter.post('/validate-rule',
    requiredFields, 
    checkForSpecifiedField,
    ruleFieldValidation,
    validationController)

module.exports = validationRouter