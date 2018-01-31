const express = require('express');
const app = express();
const api = require('./routes/api');
const index = require('./routes/index');


//web server
app.use('/', index);
app.use('/api',api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(function(req, res){
  res.send(404);
});
const port = process.env.port || '3000';
app.listen(port, () => {
  console.log(`server running and listening on : ${port} ...`);
});

module.exports = app;
