const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter => requestBody.hasOwnProperty(parameter));


module.exports = {
  'hasRequestRequiredParameters' : hasRequestRequiredParameters
};