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

router.post('/projects/add', token.verifyToken, (req, res, next) => {
  let requiredParameters = ['title', 'uid'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('somme of this required parameters are missing: '
      .concat(requiredParameters.join(', ')))
  }, (req, res) => {
  new projectModel(req.body).save().then( project => res.send(project))
    .catch( err => { res.status(500).send(`database error ${err}`);
  })
});

router.post('/login', (req, res, next) => {
  console.log(req.cookies);
  const requiredParameters = ['username', 'password'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('somme of this required parameters are missing: '
      .concat(requiredParameters.join(', ')))
}, (req, res) => {
  let query = userModel.where({username : req.body.username, password: req.body.password});
  query.findOne((err, user) =>{
    const tokenExpirationTime = 60 * 60 * 24 * 1000;
    logger.debug(user);
    if(!user){
      res.status(401).send('login fail');
    }
    else{
      let token = jwt.sign({iss : 'rtn-token', id: user.uid},
        req.app.get('secret_key'),{expiresIn : tokenExpirationTime});
      res.cookie('token', token,{ maxAge: tokenExpirationTime, httpOnly: true})
        .json({user : user.username, logged : true, token : token});
    }
  })
});

const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter => requestBody.hasOwnProperty(parameter));

module.exports = router;
