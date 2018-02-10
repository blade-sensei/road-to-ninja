const mongoose = require('mongoose');


let schema = new mongoose.Schema({
  title : String,
  description: String,
  status : String,
  data : String,
  uid : String,
  requires : Array
});

let Project = mongoose.model("projects", schema);

module.exports = Project;
