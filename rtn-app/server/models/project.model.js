const mongoose = require('mongoose');

let schema = new mongoose.Schema({ name: String});
let User = mongoose.model("homes", schema);

module.exports = User;
