const project = require('../models/project.model');

const getAll = () => {
  return project.find();
};

module.exports = {
  getAll,
};
