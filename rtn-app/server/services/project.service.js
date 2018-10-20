const projectModel = require('../models/project.model');
const projectHelper = require('../utils/project');

const getAll = () => {
  return projectModel.getAll();
};

const findById = async (id) => {
  const project = await projectModel.findById(id);
  if (project) {
    const projectCopy = JSON.parse(JSON.stringify(project));
    if (projectHelper.hasRequiredProjects(projectCopy)) {
      return projectHelper.getRequiredProjects(projectCopy);
    }
  }
  return project;
};

module.exports = {
  getAll,
  findById,
};
