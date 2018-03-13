const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');

const verifyToken = (req, res, next)  => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
    || req.cookies.token;
  if (token) {
    jwt.verify(token, req.app.get('secret_key'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.auth = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

const isAuthorized = (req, res, next) => {
    if (req.auth.admin === true){
      next();
    }
    else if (req.auth.id === req.params.uid){
      next();
    }
    else{
      res.status(403);
      res.send('You are not allowed to view this page.');
    }
};

module.exports = {
  'isAuthorized' : isAuthorized,
  'verifyToken' : verifyToken
};