const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'User must have a username'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'User must have a password']
  }
});

const User = mongoose.model('User', userScheme);

module.exports = User;
