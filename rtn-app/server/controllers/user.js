const express = require('express');
const token = require('../middlewares/token');
const userModel = require('../models/user.model');
const ProjectModel = require('../models/project.model');
const verifyReq = require('../utils/request');
const projectHelper = require('../utils/project');

const router = express.Router();

router.get('', (req, res) => {
  userModel.find((err, docs) => {
    return res.send(docs);
  });
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
router.get('/:uid/projects', async (req, res) => {
  const filterProperties = Object.keys(req.query);
  let whereConditionRequest = { uid: req.params.uid };
  if (filterProperties.length > 0) {
    whereConditionRequest = Object.assign(whereConditionRequest, req.query);
  }
  Reflect.deleteProperty(whereConditionRequest, 'search');
  let projects = await ProjectModel.find(whereConditionRequest);
  if (Reflect.has(req.query, 'search')) {
    projects = projects.filter((project) => {
      return project.title.toLowerCase().includes(req.query.search.toLowerCase());
    });
  }
  const projectsWithRequires = await Promise.all(
    projects.map((userProject) => {
      if (projectHelper.hasRequiredProjects(userProject)) {
        return projectHelper.getRequiredProjects(userProject);
      }
      return userProject;
    })
  );
  res.status(200);
  return res.send(projectsWithRequires);
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
      res
        .status(404)
        .send(
          'Some of these required parameters are missing : '.concat(requiredParameters.join(', '))
        );
    }
  },
  (req, res) => {
    req.body.uid = req.params.uid;
    new ProjectModel(req.body)
      .save()
      .then((project) => {
        return res.send(project);
      })
      .catch((err) => {
        return res.status(500).send(`database error ${err}`);
      });
  }
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
      res
        .status(404)
        .send(
          'Some of these required parameters are missing : '.concat(requiredParameters.join(', '))
        );
    }
  },
  (req, res) => {
    const project = Object.assign({}, req.body);
    const requiresId = project.requires.map((requiredProject) => {
      return Reflect.get(requiredProject, '_id');
    });
    Reflect.set(project, 'requires', requiresId);
    ProjectModel.findOneAndUpdate(
      {
        uid: req.params.uid,
        _id: req.params.id,
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
          res.send("Project not found or couldn't save.");
        }
      }
    );
  }
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
