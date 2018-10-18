const express = require('express');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const projectController = require('./api/project');

const router = express.Router();

router.use('/users', userController);
router.use('/auth', authController);
router.use('/projects', projectController);

module.exports = router;
