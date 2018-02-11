const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');


//models
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');

router.get('/users', (req,res) => {
  userModel.find((err, docs) => {
    logger.debug(docs);
    res.send(docs);
  });
});

router.get('/users/:id/projects', (req, res) => {
  logger.debug(req.params.id);
  projectModel.find({uid : req.params.id}, ( error, docs ) => {
    res.send(docs);
  })
});

module.exports = router;
