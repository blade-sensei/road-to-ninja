const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  username : String,
  uid : String,
  name: String,
  password : String,
  admin : Boolean
  });
let User = mongoose.model("users", schema);

module.exports = User;
