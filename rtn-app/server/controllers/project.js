const projectService = require('../services/project');

const getAll = () => {
  return projectService.getAll();
};

module.exports = {
  getAll,
};
