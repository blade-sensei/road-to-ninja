const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res,next) => {
  console.log(path.join(__dirname,'../'));
  res.sendFile('index.html', {root: path.join(__dirname,'../')});
});

module.exports = router;