const enablePreFlightRequest = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return res.end();
  }
  return next();
};

module.exports = { enablePreFlightRequest };