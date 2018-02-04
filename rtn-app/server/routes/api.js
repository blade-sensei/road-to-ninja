const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../helpers/logger');

//models
const userModel = require('../models/user.model');

//database server
mongoose.connect('mongodb://127.0.0.1/test');
const db = mongoose.connection;
db.once('open', () => {
  logger.info('database connexion success!');
});

router.get('/users', (req,res) => {
  userModel.find((err, docs) => {
    logger.debug(docs);
    res.send(docs);
  });
});

module.exports = router;
