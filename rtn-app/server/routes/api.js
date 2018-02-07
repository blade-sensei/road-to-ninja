const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');


//models
const userModel = require('../models/user.model');

router.get('/users', (req,res) => {
  userModel.find((err, docs) => {
    logger.debug(docs);
    res.send(docs);
  });
});

router.post('/user/feed',  (req, res) => {
  userModel.create({name : 'quention poure'}, (err, user) => {
    logger.debug(user);
  })
});

module.exports = router;
