const express = require('express');
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

router.get('/:id', async (req, res) => {
  try {
    const project = await projectController.findById(req.params.id);
    if (project) {
      res.status(200);
      return res.send(project);
    }
    return res.status(404).send({ error: 'not found' });
  } catch (e) {
    logger.info(e.message);
    return res.status(404).send({ error: 'query parameter is not valid' });
  }
});

module.exports = router;
