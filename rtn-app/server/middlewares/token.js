const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)  => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
    || req.cookies.token;
  if (token) {
    jwt.verify(token, req.app.get('secret_key'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
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

module.exports = {
 'verifyToken' : verifyToken
};