import express from 'express'
const router = express.Router()

router.route('/posts')
// .get(getPosts)
// .post(createPost)

router.route('/posts/:id')
// .get(getSinglePost)
// .put(editPost)
// .delete(deletePost)

router.route('/register')
// .post(registerUser)

router.route('/login')
// .post(loginUser)

router.route('/posts/:id/reviews')
// .post(addReview)

router.route('/posts/:postId/reviews/:reviewId')
// .delete(deleteReview)

router.route('/profile')
// .get(profileView)

export default router

