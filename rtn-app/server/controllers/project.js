const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const token = require('../middlewares/token');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');


router.get('/projects', token.verifyToken, token.isAuthorized, (req,res) => {
  projectModel.find((err, docs) => {
    res.send(docs);
  });
});