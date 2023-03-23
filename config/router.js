import express from 'express'
const router = express.Router()
import { getPosts, getSinglePost, createPost, editPost, deletedPost } from '../controllers/posts.js'
import { profileView } from '../controllers/users.js'
import { addComment, deleteComment } from '../controllers/comments.js'

router.route('/posts')
  .get(getPosts)
  .post(createPost)

router.route('/posts/:id')
  .get(getSinglePost)
  .put(editPost)
  .delete(deletedPost)

router.route('/register')
// .post(registerUser)

router.route('/login')
// .post(loginUser)

router.route('/posts/:id/comments')
  .post(addComment)

router.route('/posts/:postId/comments/:commentId')
  .delete(deleteComment)

router.route('/profile')
  .get(profileView)

export default router

