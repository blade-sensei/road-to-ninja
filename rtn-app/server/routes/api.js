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

router.post('/projects/add', (req, res, next) => {
  if(req.body.hasOwnProperty('title')){
    next();
  }
  else{
    res.status(406).send('require parameters');
  }
}, (req, res, next) => {
  logger.info(req.body);
  res.send(req.body);
});




module.exports = router;
