const express = require('express');
const logger = require('../helpers/logger');
const userData = require('../helpers/seeds/user.feed');
const projectData = require('../helpers/seeds/project.feed');

const router = express.Router();
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');

const createCollection = (model, documents) => new Promise(resolve => model
  .insertMany(documents).then(() => model.find((err, docs) => {
    logger.debug(docs);
    return resolve(docs);
  })));

const dropCollection = model => new Promise((resolve) => {
  model.remove(() => {
    logger.debug('remove');
    resolve();
  });
});

router.get('/users', (req, res) => {
  const users = userData;
  dropCollection(userModel).then(() => {
    createCollection(userModel, users).then(documents => res.send(documents));
  });
});

router.get('/projects', (req, res) => {
  const projects = projectData;
  return dropCollection(projectModel).then(() =>
    createCollection(projectModel, projects).then(documents =>
      res.send(documents)));
});

module.exports = router;
