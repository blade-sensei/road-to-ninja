const projectService = require('../services/project');

const OBJECTID_LENGTH = 24;

const getAll = () => {
  return projectService.getAll();
};

const findById = (id) => {
  if (id.length !== OBJECTID_LENGTH) {
    throw new Error('id is not object id type');
  }
  return projectService.findById(id);
};

module.exports = {
  getAll,
  findById,
};
