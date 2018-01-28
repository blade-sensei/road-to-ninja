const express = require('express');
const app = express();
const projects = require('./routes/projects');
const index = require('./routes/index');


app.use('/', index);
app.use('/projects',projects);
app.use(function(req, res){
  res.send(404);
});


const port = process.env.port || '3000';
app.listen(port, () => {
  console.log(`server running and listening on : ${port} ...`);
});

module.exports = app;