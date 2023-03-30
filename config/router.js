import express from 'express'
const router = express.Router()
import { getPosts, getSinglePost, createPost, editPost, deletedPost, getEditPage } from '../controllers/posts.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { profileView, otherUserProfile, getBio, editBio } from '../controllers/users.js'
import { addComment, deleteComment } from '../controllers/comments.js'

router.route('/posts')
  .get(getPosts)
  .post(secureRoute, createPost)

router.route('/posts/:id')
  .get(getSinglePost)
  .put(secureRoute, editPost)
  .delete(secureRoute, deletedPost)

router.route('/posts/:id/edit')
  .get(getEditPage)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/posts/:id/comments')
  .post(secureRoute, addComment)

router.route('/posts/:postId/comments/:commentId')
  .delete(secureRoute, deleteComment)

router.route('/profile')
  .get(secureRoute, profileView)

router.route('/profile/:id')
  .get(otherUserProfile)

router.route('/profile/:id/edit')
  .get(getBio)
  .put(editBio)

export default router

