const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'not started',
  },
  data: {
    type: String,
    default: 'http://',
  },
  uid: String,
  requires: Array,
});

const Project = mongoose.model('projects', schema);

module.exports = Project;
