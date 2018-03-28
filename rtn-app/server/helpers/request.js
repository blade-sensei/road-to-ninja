const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter => requestBody.hasOwnProperty(parameter));


module.exports = {
  'hasRequiredParameters' : hasRequestRequiredParameters
};