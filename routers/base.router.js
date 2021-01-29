// GET endpoint router. Responds with personal info to requests sent to the base URL

const express = require('express');
const baseRouter = express();
const { okResponse } = require('../utils/response.utils')
const responseObject = { 
        name: 'Ayooluwa Adedipe',
        github: '@Ay-slim',
        email: 'ayooluwaadedipe@gmail.com',
        mobile: '07060951036'
    }

baseRouter.get('/', (_, res)=>{
    okResponse({message: 'My Rule-Validation API', data: responseObject, res})
})

module.exports = baseRouter