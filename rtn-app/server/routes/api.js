const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const projectController = require('../controllers/project');

//models
router.use('/users', userController);
router.use('/auth', authController);
router.use('/projects', projectController);

module.exports = router;
