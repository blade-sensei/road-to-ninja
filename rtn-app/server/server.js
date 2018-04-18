const express = require('express');
const app = express();
const api = require('./routes/api');
const index = require('./routes/index');
const seed = require('./routes/seed');
const logger = require('./helpers/logger');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// enable cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ' +
             'Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.set('secret_key', config.auth.key);
// adding routes modules
app.use('/', index);
app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', api);
app.use('/seed', seed);
// config server
app.use((req, res) => {
  res.send(404);
});
const port = process.env.port || config.server.port;
app.listen(port, () => {
  logger.info(`server api is running on :${port}port ...`);
});

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`).then(() => {
  mongoose.set('debug', true);
  logger.info(`database connection on ${mongoose.connection.port} ' + 
              'port with success!`);
});

module.exports = app;
