import express from 'express'
const router = express.Router()
import { getPosts, getSinglePost, createPost, editPost, deletedPost } from '../controllers/posts.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { profileView } from '../controllers/users.js'


router.route('/posts')
  .get(getPosts)
  .post(secureRoute, createPost)

router.route('/posts/:id')
  .get(getSinglePost)
  .put(secureRoute, editPost)
  .delete(secureRoute, deletedPost)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/posts/:id/reviews')
// .post(secureRoute, addReview)

router.route('/posts/:postId/reviews/:reviewId')
// .delete(secureRoute, deleteReview)

router.route('/profile')
  .get(secureRoute, profileView)

export default router

