const hasRequestRequiredParameters = (requiredParameters, requestBody) =>
  requiredParameters.every(parameter =>
    Object.prototype.hasOwnProperty.call(requestBody, parameter));

module.exports = {
  hasRequiredParameters: hasRequestRequiredParameters,
};
