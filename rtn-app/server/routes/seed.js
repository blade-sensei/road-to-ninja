const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const seedData = require('../helpers/seeds/seedData');

const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');

router.get('/users', (req,res) => {
  let users = seedData.users;
  seedRemove(userModel).then(() => {
    seedFeed(userModel, users).then((documents) => {
      res.send(documents);
    })
  });
});

router.get('/projects',  (req, res) => {
  let projects = seedData.projects;
  seedRemove(projectModel).then(() => {
    seedFeed(projectModel, projects).then((documents) => {
      res.send(documents);
    })
  });
});

const seedRemove = (model) => {
  return new Promise((resolve) =>{
    model.remove(() => {
      logger.debug('remove');
      resolve();
    });
  });
};

const seedFeed = (model, documents) => {
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
