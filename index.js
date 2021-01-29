const express = require('express')
const helmet =require('helmet')
const morgan = require('morgan');
const indexRouter = require('./routers/index.router');
const app = express();

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.use(indexRouter)

app.listen(process.env.PORT || 5500, () =>
  console.log(`App running on port ${process.env.PORT || 5500}`)
);