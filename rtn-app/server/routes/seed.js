const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');

//models
const userModel = require('../models/user.model');

router.get('/users', (req,res) => {
  let users = [
    {
      username : 'sensei',
      name: 'juan',
      password : 'pswd',
      projects : []
    },
    {
      username : 'repou',
      name: 'poure',
      password : 'pswd',
      projects : []
    },
    {
      username : 'pampa',
      name: 'pampa',
      password : 'pswd',
      projects : []
    }
  ];
  seedRemove(userModel).then(() => {
    seedFeed(userModel, users).then((documents) => {
      res.send(documents);
    })
  });
});



router.get('user/find', (req,res) => {

});

router.post('/project',  (req, res) => {
  userModel.create({name : 'quention poure'}, (err, user) => {
    logger.debug(user);
  })
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

const seedFind = (model, documents) => {

};

module.exports = router;
