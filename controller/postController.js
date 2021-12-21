const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).send({
      status: 'sucess',
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail'
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({
      status: 'sucess',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail'
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).send({
      status: 'sucess',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail'
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    });
    res.status(200).send({
      status: 'sucess',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail'
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({
      status: 'sucess'
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail'
    });
  }
};
