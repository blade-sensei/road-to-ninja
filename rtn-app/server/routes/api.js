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

router.get('/projects', (req,res) => {
  projectModel.find((err, docs) => {
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
  let requiredPameters = ['title', 'uid'];
  hasRequiredParameters(requiredPameters, req.body) ? next() :
    res.status(404).send('somme of this required parameters are missing: '
      .concat(requiredPameters.join(', ')))
  }, (req, res) => {
  logger.info(req.body);
  let project = new projectModel(req.body);
  project.save( (err, ) => {
    (err) ? res.status(400).send('insert dabatase failed') :
      res.send({"validated" : true});
  });
});

//middleware
const hasRequiredParameters = (requiredParameters, bodyParameters) =>
  requiredParameters.every(parameter => bodyParameters.hasOwnProperty(parameter));

module.exports = router;
//this is the change for test branch
