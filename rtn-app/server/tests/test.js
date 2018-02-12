const isRequireParametersFounded = (parameters, bodyParameters) => {
  return parameters.every(parameter => bodyParameters.hasOwnProperty(parameter));
};

let bodyParams = {
  'title' :  'tile'
};

let parameters = ['description','title'];

if(isRequireParametersFounded(parameters, bodyParams, isGood, isBad)){
  console.log('founded');
}
else{
  console.log('not founded');
}