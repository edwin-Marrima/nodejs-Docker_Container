const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPasswrod = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPasswrod
    });
    req.session.user = newUser;
    res.status(201).json({
      status: 'sucess',
      data: {
        newUser
      }
    });
  } catch (e) {
    res.status(400).send({
      status: 'fail'
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({
        status: 'fail',
        message: 'User not found'
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = user;
      return res.status(200).json({
        status: 'sucess'
      });
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'Incorrect password or username'
      });
    }
  } catch (e) {
    res.status(400).send({
      status: 'fail'
    });
  }
};
