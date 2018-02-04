const express = require('express');
const app = express();
const api = require('./routes/api');
const index = require('./routes/index');
const logger = require('./helpers/logger');


//enable cross origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//adding routes modules
app.use('/', index);
app.use('/api',api);

//config server
app.use(function(req, res){
  res.send(404);
});
const port = process.env.port || '3000';

app.listen(port, () => {
  logger.info(`server api is running on : ${port} port ...` );
});

module.exports = app;
