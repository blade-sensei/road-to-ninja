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
  let requiredParameters = ['title', 'uid'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('somme of this required parameters are missing: '
      .concat(requiredParameters.join(', ')))
  }, (req, res) => {
  new projectModel(req.body).save().then( project => res.send(project))
    .catch( err => { res.status(500).send(`database error ${err}`);
  })
});

//middleware
const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter => requestBody.hasOwnProperty(parameter));

module.exports = router;
