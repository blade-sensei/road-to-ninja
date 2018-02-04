const mongoose = require('mongoose');

let schema = new mongoose.Schema({ name: String});
let User = mongoose.model("users", schema);

module.exports = User;
