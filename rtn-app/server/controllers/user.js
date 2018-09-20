const express = require('express');
const token = require('../middlewares/token');
const userModel = require('../models/user.model');
const ProjectModel = require('../models/project.model');
const verifyReq = require('../helpers/request');

const router = express.Router();

function getRequiredProjects(project) {
  return new Promise(async (resolve, reject) => {
    try {
      const projectRequiresInformation = await Promise
        .all(project.requires
          .map(requireProjectId => ProjectModel.findById(requireProjectId)));
      Reflect.set(project, 'requires', projectRequiresInformation);
      resolve(project);
    } catch (e) {
      reject(e);
    }
  });
}

function hasRequiredProjects(project) {
  return project.requires.length > 0;
}

router.get('', (req, res) => {
  userModel.find((err, docs) => res.send(docs));
});

router.get('/current-user', token.verifyToken, (req, res) => {
  userModel.findOne({ uid: req.auth.id }, (err, user) => {
    if (user) {
      return res.send(user);
    }
    return res.status(404).send('not found');
  });
});

// user projects
router.get('/:uid/projects', (req, res) => {
  const filterProperties = Object.keys(req.query);
  let whereConditionRequest = { uid: req.params.uid };
  if (filterProperties.length > 0) {
    whereConditionRequest = Object.assign(whereConditionRequest, req.query);
  }
  Reflect.deleteProperty(whereConditionRequest, 'search');
  ProjectModel.find(whereConditionRequest, async (error, docs) => {
    if (error) {
      return res.send('Bad request or database problem.');
    }
    let projects = [...docs];
    if (Reflect.has(req.query, 'search')) {
      projects = docs
        .filter(project => project.title.toLowerCase()
          .includes(req.query.search.toLowerCase()));
    }
    const projectsWithRequires = await Promise.all(projects
      .map(async (userProject) => {
        if (hasRequiredProjects(userProject)) {
          return getRequiredProjects(userProject);
        }
        return userProject;
      }));
    res.status(200);
    return res.send(projectsWithRequires);
  });
});

router.post(
  '/:uid/projects',
  token.verifyToken,
  token.isAuthorized,
  (req, res, next) => {
    const requiredParameters = ['title'];
    if (verifyReq.hasRequiredParameters(requiredParameters, req.body)) {
      next();
    } else {
      res.status(404).send('Some of these required parameters are missing : '
        .concat(requiredParameters.join(', ')));
    }
  },
  (req, res) => {
    req.body.uid = req.params.uid;
    new ProjectModel(req.body).save()
      .then(project => res.send(project))
      .catch(err => res.status(500).send(`database error ${err}`));
  },
);

router.patch(
  '/:uid/projects/:id',
  token.verifyToken,
  token.isAuthorized,
  (req, res, next) => {
    const requiredParameters = ['title'];
    if (verifyReq.hasRequiredParameters(requiredParameters, req.body)) {
      next();
    } else {
      res.status(404).send('Some of these required parameters are missing : '
        .concat(requiredParameters.join(', ')));
    }
  },
  (req, res) => {
    const project = Object.assign({}, req.body);
    const requiresId = project.requires
      .map(requiredProject => Reflect.get(requiredProject, '_id'));
    Reflect.set(project, 'requires', requiresId);
    ProjectModel.findOneAndUpdate(
      { uid: req.params.uid, _id: req.params.id },
      project,
      { new: true },
      async (err, updatedProject) => {
        if (updatedProject) {
          let projectWithRequires = JSON.parse(JSON.stringify(updatedProject));
          if (hasRequiredProjects(updatedProject)) {
            projectWithRequires = await getRequiredProjects(updatedProject);
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
);

router.get('/:name', (req, res) => {
  userModel.findOne({ name: req.params.name }, (err, user) => {
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('not found');
    }
  });
});

module.exports = router;
