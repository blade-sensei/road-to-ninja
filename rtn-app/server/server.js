const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const api = require('./routes/api');
const index = require('./routes/index');
const seed = require('./routes/seed');
const config = require('./config');
const cors = require('./middlewares/cors');
const logger = require('./utils/logger');

const app = express();
app.set('secret_key', config.auth.key);

module.exports = app;

app.use(bodyParser.json());
app.use(cookieParser());

// enable cross origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, PATCH');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors.enablePreFlightRequest);

// adding routes modules
app.use('/', index);
app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', api);
app.use('/seed', seed);
app.use((req, res) => {
  res.send(404);
});

// config server
const port = process.env.PORT || config.server.port;
app.listen(port, () => {
  logger.info(`server api is running on : ${port} port ...`);
});

// config database
const mongoURI = process.env.DB_URI || config.db.uri;
mongoose
  .connect(mongoURI)
  .then(() => {
    return logger.info(`database connection on ${mongoose.connection.port} port with success!`);
  })
  .catch((error) => {
    logger.info('fail to connect to database');
    logger.error(error.message);
  });
