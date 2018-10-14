const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const verifyReq = require('../helpers/request');

const router = express.Router();
router.post(
  '/login',
  (req, res, next) => {
    const requiredParameters = ['username', 'password'];
    if (verifyReq.hasRequiredParameters(requiredParameters, req.body)) {
      next();
    } else {
      res
        .status(404)
        .send(
          'Some of this required parameters are missing: '.concat(requiredParameters.join(', '))
        );
    }
  },
  (req, res) => {
    const query = userModel.where({
      username: req.body.username,
      password: req.body.password,
    });
    query.findOne((err, user) => {
      const tokenExpirationTime = 60 * 60 * 24 * 1000;
      if (!user) {
        res.status(401).send('Login fail');
      } else {
        const token = jwt.sign(
          {
            iss: 'rtn-token',
            id: user.uid,
            admin: user.admin,
          },
          req.app.get('secret_key'),
          {
            expiresIn: tokenExpirationTime,
          }
        );
        res.json({
          username: user.username,
          logged: true,
          token,
        });
      }
    });
  }
);
module.exports = router;
