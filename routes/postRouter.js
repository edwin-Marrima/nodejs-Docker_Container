const express = require('express');
const postController = require('../controller/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route('/:id')
  .get(protect, postController.getOnePost)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
