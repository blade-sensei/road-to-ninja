const hasRequestRequiredParameters = (requiredParameters, requestBody) => {
  return requiredParameters.every((parameter) => {
    return Object.prototype.hasOwnProperty.call(requestBody, parameter);
  });
};

module.exports = {
  hasRequiredParameters: hasRequestRequiredParameters,
};
