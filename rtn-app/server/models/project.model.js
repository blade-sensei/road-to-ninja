const mongoose = require('mongoose');


let schema = new mongoose.Schema({
  title : String,
  description: {type : String, default : ''},
  status : {type : String, default : 'not started' },
  data : {type : String, default : 'http://'},
  uid : String,
  requires : Array
});

let Project = mongoose.model("projects", schema);

module.exports = Project;
