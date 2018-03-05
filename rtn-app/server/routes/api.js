const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const token = require('../middlewares/token');
const jwt = require('jsonwebtoken');

//models
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');

router.get('/users', token.verifyToken, (req,res) => {
  userModel.find((err, docs) => {
    logger.debug(docs);
    res.send(docs);
  });
});

router.get('/projects', token.verifyToken,(req,res) => {
  projectModel.find((err, docs) => {
    logger.debug(docs);
    res.send(docs);
  });
});

router.get('/users/:id/projects', token.verifyToken, (req, res) => {
  logger.debug(req.params.id);
  projectModel.find({uid : req.params.id}, ( error, docs ) => {
    res.send(docs);
  })
});

router.post('users/:uid/projects', (req, res, next) => {
  let requiredParameters = ['title', 'uid'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('some of this required parameters are missing: '
      .concat(requiredParameters.join(', ')))
  }, (req, res) => {
  new projectModel(req.body).save().then( project => res.send(project))
    .catch( err => { res.status(500).send(`database error ${err}`);
  })
});

router.patch('/users/:uid/projects/:id', (req, res, next) => {
  let requiredParameters = ['title'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('Some of these required parameters are missing : ')
      .concat(requiredParameters.join(', '))
  }, (req, res) => {
  let project = Object.assign({}, req.body)
  projectModel.findOneAndUpdate({'uid':req.params.uid, '_id':req.params.id}, 
    project, {new: true}, (err, project) => {
    if(project){
      res.send(project);
    }
    else{
      res.status(500);
      res.send('Project not found or couldn\'t save.');
    }
  })
});

//middleware
const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter => requestBody.hasOwnProperty(parameter));

module.exports = router;
