const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  username : String,
  name: String,
  password : String,
  projects : Array
  });
let User = mongoose.model("users", schema);

module.exports = User;
