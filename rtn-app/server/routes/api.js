const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const token = require('../middlewares/token');
const jwt = require('jsonwebtoken');

//models
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');

router.get('/users', token.verifyToken, token.isAuthorized, (req,res) => {
  userModel.find((err, docs) => {
    logger.debug(docs);
    res.send(docs);
  });
});

router.get('/projects', token.verifyToken, token.isAuthorized, (req,res) => {
  projectModel.find((err, docs) => {
    res.send(docs);
  });
});

router.get('/users/:uid/projects', token.verifyToken, token.isAuthorized, (req, res) => {
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

router.get('/user/projects', token.verifyToken, token.isAuthorized,  (req, res) => {
     projectModel.find({uid: token.decoded.id}, (error, docs) => {
      if(error){
        res.status(400);
        res.send('Bad request or database problem' + error);
      } else {
        res.status(200);
        res.send(docs);
      }
    }); 
});

router.post('/users/:uid/projects', token.verifyToken, (req, res, next) => {
  let requiredParameters = ['title', 'uid'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(400).send('some of this required parameters are missing: '
      .concat(requiredParameters.join(', ')))
  }, (req, res) => {
  new projectModel(req.body).save().then( project => res.send(project))
    .catch( err => { res.status(500).send(`database error ${err}`);
  });
}); 


router.post('/login', (req, res, next) => {
  const requiredParameters = ['username', 'password'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('Some of this required parameters are missing: '
      .concat(requiredParameters.join(', ')))
}, (req, res) => {
  let query = userModel.where({username : req.body.username, password: req.body.password});
  query.findOne((err, user) =>{
    const tokenExpirationTime = 60 * 60 * 24 * 1000;
    if(!user){
      res.status(401).send('Login fail');
    }
    else{
      let token = jwt.sign({iss : 'rtn-token', id: user.uid, admin: user.admin},
        req.app.get('secret_key'),{expiresIn : tokenExpirationTime});
      res.cookie('token', token,{ maxAge: tokenExpirationTime, httpOnly: true})
        .json({user : user.username, logged : true, token : token});
    }
  });
});

router.patch('/users/:uid/projects/:id', token.verifyToken, token.isAuthorized, (req, res, next) => {
  let requiredParameters = ['title'];
  hasRequestRequiredParameters(requiredParameters, req.body) ? next() :
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

//middleware
const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter => requestBody.hasOwnProperty(parameter));

module.exports = router;
