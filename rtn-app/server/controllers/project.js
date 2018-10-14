const express = require('express');
const projectModel = require('../models/project.model');
const projectHelper = require('../helpers/project');

const router = express.Router();

router.get('', (req, res) => {
  projectModel.find((err, docs) => {
    return res.send(docs);
  });
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
