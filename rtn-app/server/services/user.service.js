const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');
const projectHelper = require('../utils/project');

const getFilteredProjects = (uid, query) => {
  const filterProperties = Object.keys(query);
  let whereConditionRequest = { uid };
  if (filterProperties.length > 0) {
    whereConditionRequest = Object.assign(whereConditionRequest, query);
  }
  Reflect.deleteProperty(whereConditionRequest, 'search');
  return projectModel.findAll(whereConditionRequest);
};

const injectRiquiredProjects = (projects) => {
  return Promise.all(
    projects.map((userProject) => {
      if (projectHelper.hasRequiredProjects(userProject)) {
        return projectHelper.getRequiredProjects(userProject);
      }
      return userProject;
    }),
  );
};

const findAll = () => {
  return userModel.findAll();
};

const getCurrentUser = (authentication) => {
  return userModel.findOneBy({ uid: authentication.id });
};

const getProjects = async (uid, query) => {
  let projects = await getFilteredProjects(uid, query);
  if (Reflect.has(query, 'search')) {
    projects = projects.filter((project) => {
      return project.title.toLowerCase().includes(query.search.toLowerCase());
    });
  }
  await injectRiquiredProjects(projects);
};

const getByName = (name) => {
  return userModel.findOneBy({ name });
};

module.exports = {
  findAll,
  getCurrentUser,
  getProjects,
  getByName,
};
