const express = require('express');
const app = express();
const api = require('./routes/api');
const index = require('./routes/index');


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
  console.log(`server running on : ${port}, 
  and listening on host : ${process.env.host} ...` );
});

module.exports = app;
