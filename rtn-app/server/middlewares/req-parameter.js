const verifyParameters  = (req, res, next, parameters) => {
  console.log(req);
  console.log(res);
  console.log(parameters);
  if (hasRequestRequiredParameters(parameters, req.body)) {
    next()
  } else {
    res.status(404).send('Some of these required parameters are missing : '
      .concat(parameters.join(', ')));
  }
};

const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter => requestBody.hasOwnProperty(parameter));


module.exports = {
  'verifyParameters' : verifyParameters
};
