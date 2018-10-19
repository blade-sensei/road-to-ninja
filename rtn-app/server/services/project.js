const projectModel = require('../models/project.model');

const getAll = () => {
  return projectModel.getAll();
};

module.exports = {
  getAll,
};
