const projectService = require('../services/project.service');

const OBJECT_ID_LENGTH = 24;

const getAll = () => {
  return projectService.findAll();
};

const findById = (id) => {
  if (id.length !== OBJECT_ID_LENGTH) {
    throw new Error('id is not object id type');
  }
  return projectService.findById(id);
};

const add = (project) => {
  return projectService.add(project);
};

module.exports = {
  getAll,
  findById,
  add,
};
