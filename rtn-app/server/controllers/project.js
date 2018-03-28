const express = require('express');
const router = express.Router();
const token = require('../middlewares/token');
const projectModel = require('../models/project.model');


router.get('', token.verifyToken, token.isAuthorized, (req,res) => {
  projectModel.find((err, docs) => {
    res.send(docs);
  });
});

module.exports = router;