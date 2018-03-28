const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const token = require('../middlewares/token');
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');
const verifyReq = require('../helpers/request');


router.get('', token.verifyToken, token.isAuthorized, (req,res) => {
  userModel.find((err, docs) => {
    logger.debug(docs);
    res.send(docs);
  });
});

//user projects
router.get('/:uid/projects', token.verifyToken, token.isAuthorized, (req, res) => {
  if (req.query.title){
    projectModel.find({uid: req.params.uid, title:req.query.title}, (error, docs) => {
      if (error){
        res.send("Bad request or database problem.");
      } else {
        res.status(200);
        res.send(docs);
      }
    })
  } else {
    projectModel.find({uid : req.params.uid}, (error, docs) => {
      if(error){
        res.send("Bad request or database problem.");
      } else {
        res.status(200);
        res.send(docs);
      }
    })
  }
});

router.post('/:uid/projects', token.verifyToken, token.isAuthorized, (req, res, next) => {
  let requiredParameters = ['title'];
  verifyReq.hasRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('Some of these required parameters are missing : '
      .concat(requiredParameters.join(', ')));
}, (req, res) => {
  new projectModel(req.body).save().then( project => res.send(project))
    .catch( err => { res.status(500).send(`database error ${err}`);
    });
});

router.patch('/:uid/projects/:id', token.verifyToken, token.isAuthorized, (req, res, next) => {
  let requiredParameters = ['title'];
  verifyReq.hasRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('Some of these required parameters are missing : '
      .concat(requiredParameters.join(', ')));
}, (req, res) => {
  let project = Object.assign({}, req.body);
  projectModel.findOneAndUpdate({'uid':req.params.uid, '_id':req.params.id},
    project, {new: true}, (err, project) => {
      if(project){
        res.status(200);
        res.send(project);
      }
      else{
        res.status(500);
        res.send('Project not found or couldn\'t save.');
      }
    });
});

module.exports = router;