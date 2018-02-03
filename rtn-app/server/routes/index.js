const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
  res.send('<h1> Road to ninja API </h1>');
  next();
});

module.exports = router;