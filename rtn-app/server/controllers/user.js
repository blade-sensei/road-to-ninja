const userService = require('../services/user.service');

const findAll = () => {
  return userService.findAll();
};

const getCurrentUser = (authentication) => {
  return userService.getCurrentUser(authentication);
};

const getProjects = (uid, query) => {
  return userService.getProjects(uid, query);
};

const updateProject = (uid, id) => {
    const project = Object.assign({}, req.body);
    const requiresId = project.requires.map((requiredProject) => {
      return Reflect.get(requiredProject, '_id');
    });
    Reflect.set(project, 'requires', requiresId);
    ProjectModel.findOneAndUpdate(
      {
        uid,
        id
      },
      project,
      { new: true },
      async (err, updatedProject) => {
        if (updatedProject) {
          let projectWithRequires = JSON.parse(JSON.stringify(updatedProject));
          if (projectHelper.hasRequiredProjects(updatedProject)) {
            projectWithRequires = await projectHelper.getRequiredProjects(updatedProject);
          }
          res.status(200);
          res.send(projectWithRequires);
        } else {
          res.status(500);
          res.send('Project not found or couldn\'t save.');
        }
      },
    );
  },
  };

module.exports = {
  findAll,
  getCurrentUser,
  getProjects,

};
