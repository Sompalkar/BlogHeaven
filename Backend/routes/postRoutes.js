const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost, getUserPosts,addComment } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllPosts);
router.get('/user', authMiddleware, getUserPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

router.post('/:id/comments', authMiddleware, addComment);


module.exports = router;