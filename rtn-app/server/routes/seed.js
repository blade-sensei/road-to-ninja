const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const userData = require('../helpers/seeds/user.feed');
const projectData = require('../helpers/seeds/project.feed');

const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');

router.get('/users', (req,res) => {
  let users = userData;
  dropCollection(userModel).then(() => {
    createCollection(userModel, users).then((documents) => {
      res.send(documents);
    })
  });
});

router.get('/projects',  (req, res) => {
  let projects = projectData;
  dropCollection(projectModel).then(() => {
    createCollection(projectModel, projects).then((documents) => {
      res.send(documents);
    })
  });
});

const dropCollection = (model) => {
  return new Promise((resolve) =>{
    model.remove(() => {
      logger.debug('remove');
      resolve();
    });
  });
};

const createCollection = (model, documents) => {
  return new Promise((resolve) => {
    model.insertMany(documents).then( () => {
      model.find((err, docs) => {
        logger.debug(docs);
        resolve(docs);
      });
    });
  });
};

module.exports = router;
