const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const verifyReq = require('../helpers/request');

router.post('/login', (req, res, next) => {
  const requiredParameters = ['username', 'password'];
  verifyReq.hasRequiredParameters(requiredParameters, req.body) ? next() :
    res.status(404).send('Some of this required parameters are missing: '
      .concat(requiredParameters.join(', ')))
}, (req, res) => {
  let query = userModel.where({username : req.body.username, password: req.body.password});
  query.findOne((err, user) =>{
    const tokenExpirationTime = 60 * 60 * 24 * 1000;
    if(!user){
      res.status(401).send('Login fail');
    } else {
      let token = jwt.sign({iss : 'rtn-token', id: user.uid, admin: user.admin},
        req.app.get('secret_key'),{expiresIn : tokenExpirationTime});
      res.json({username : user.username, logged : true, token : token});
    }
  });
});
module.exports = router;