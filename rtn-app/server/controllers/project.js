const express = require('express');
const router = express.Router();
const projectModel = require('../models/project.model');


router.get('', (req,res) => {
  projectModel.find((err, docs) => {
    res.send(docs);
  });
});

module.exports = router;