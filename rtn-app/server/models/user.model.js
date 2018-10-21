const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  uid: String,
  name: String,
  password: String,
  admin: Boolean,
});
const User = mongoose.model('users', schema);

const findOneBy = (condition) => {
  return User.findOne(condition);
};

const findAll = () => {
  return User.find().exe();
};

module.exports = {
  User,
  findOneBy,
  findAll,
};
