const express = require('express');
const projectModel = require('../models/project.model');

const router = express.Router();

router.get('', (req, res) => {
  projectModel.find((err, docs) => res.send(docs));
});

module.exports = router;
