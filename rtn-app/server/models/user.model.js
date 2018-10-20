const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  uid: String,
  name: String,
  password: String,
  admin: Boolean,
});
const User = mongoose.model('users', schema);

const findOneBy = (username, password) => {
  return User.findOne({
    username,
    password,
  });
};

module.exports = {
  User,
  findOneBy,
};
