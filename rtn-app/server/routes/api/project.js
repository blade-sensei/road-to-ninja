const express = require('express');
const projectModel = require('../../models/project.model');
const projectHelper = require('../../utils/project');
const projectController = require('../../controllers/project');

const router = express.Router();

router.get('', async (req, res) => {
  try {
    return res.send(await projectController.getAll());
  } catch (e) {
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
