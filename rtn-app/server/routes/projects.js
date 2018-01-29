const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//database server

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.once('open', () => {
  console.log('database connexion success!');
});

router.get('/', (req,res) => {


  let schema = new mongoose.Schema({ name: String});
  let User = mongoose.model("homes", schema);
  User.find((err, docs) => {
    res.send(docs);
  });
});

module.exports = router;
