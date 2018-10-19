const express = require('express');
const projectModel = require('../../models/project.model');
const projectHelper = require('../../utils/project');
const projectController = require('../../controllers/project');
const logger = require('../../utils/logger');

const router = express.Router();

router.get('', async (req, res) => {
  try {
    const projects = await projectController.getAll();
    res.send(projects);
  } catch (e) {
    logger.info(e.message);
    return res.status(500).send('not found');
  }
});

router.get('/:id', (req, res) => {
  projectModel.findById(req.params.id, async (err, project) => {
    if (project) {
      let projectWithRequires = JSON.parse(JSON.stringify(project));
      if (projectHelper.hasRequiredProjects(project)) {
        projectWithRequires = await projectHelper.getRequiredProjects(project);
      }
      res.status(200);
      res.send(projectWithRequires);
    } else {
      res.status(404).send('not found');
    }
  });
});

module.exports = router;
