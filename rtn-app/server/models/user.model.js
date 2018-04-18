const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  uid: String,
  name: String,
  password: String,
  admin: Boolean,
});
const User = mongoose.model('users', schema);

module.exports = User;
