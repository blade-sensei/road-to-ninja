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

module.exports = router;
