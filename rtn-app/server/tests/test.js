const isRequireParametersFounded = (parameters, bodyParameters) => {
  for (let parameter of parameters) {
    if(!bodyParameters.hasOwnProperty(parameter)){
      return false;
    }
  }
  return true;
};

let bodyParams = {
  'title' :  'tile',
  'description' : 'description'
};

let parameters = ['description','title'];

const isBad = () => {
  console.log('isfalse');
  return false;
};

const isGood = () => {
  console.log('isgood');
  return true;
};
if(isRequireParametersFounded(parameters, bodyParams, isGood, isBad)){
  console.log('founded');
}
else{
  console.log('not founded');
}