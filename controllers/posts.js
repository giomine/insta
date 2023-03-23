import { sendError } from '../config/errors.js'
import Post from '../models/posts.js'

// * INDEX route
// Endpoints: /posts

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('owner')
    return res.json(posts)
  } catch (error) {
    return sendError(error, res)
  }
}

// * SHOW route
// Endpoints: /posts/:id

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id).populate('owner').populate('comments.owner')
    if (!post) throw new Error('Post not found')
    return res.json(post)
  } catch (error) {
    return sendError(error, res)
  }
}


// * POST route
// Endpoint: /posts

export const createPost = async (req, res) => {
  try {
    req.body.owner = req.loggedInUser._id
    const createdPost = await Post.create(req.body)
    return res.status(201).json(createdPost)
  } catch (err) {
    return sendError(err, res)
  }
}


// * DELETE route
// Endpoint: /posts/:id

export const deletedPost = async (req, res) => {
  try {
    const { id } = req.params
    const deletedPost = await Post.findByIdAndDelete(id)
    if (!deletedPost) throw new Error('Post not found')
    return res.sendstatus(204)
  } catch (error) {
    return sendError(error, res)
  }
}