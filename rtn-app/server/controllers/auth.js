const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const token = require('../middlewares/token');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');


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