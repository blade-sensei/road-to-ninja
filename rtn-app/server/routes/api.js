const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//models
const projectsModel = require('../models/project.model');

//database server
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.once('open', () => {
  console.log('database connexion success!');
});

router.get('/projects', (req,res) => {

  projectsModel.find((err, docs) => {
    res.send(docs);
  });
});

module.exports = router;
