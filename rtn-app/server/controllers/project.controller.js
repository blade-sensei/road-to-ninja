const projectService = require('../services/project.service');

const OBJECT_ID_LENGTH = 24;

const getAll = () => {
  return projectService.getAll();
};

const findById = (id) => {
  if (id.length !== OBJECT_ID_LENGTH) {
    throw new Error('id is not object id type');
  }
  return projectService.findById(id);
};

module.exports = {
  getAll,
  findById,
};
