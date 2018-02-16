const mongoose = require('mongoose');


let schema = new mongoose.Schema({
  title : String,
  description: String,
  status : {type : String, default : 'not started' },
  data : String,
  uid : String,
  requires : Array
});

let Project = mongoose.model("projects", schema);

module.exports = Project;
