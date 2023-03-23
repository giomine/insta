import Post from '../models/posts.js'
import { NotFound, sendError, Unauthorized } from '../config/errors.js'
// import { sendError } from '../config/errors.js'


// * INDEX route
// Endpoints: /posts

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    // const posts = await Post.find().populate('owner')
    return res.json(posts)
  } catch (err) {
    return sendError(err, res)
    // return res.json({ message: `Gah, errors! ${error}` })
    // return sendError(error, res)
  }
}

// * SHOW route
// Endpoints: /posts/:id

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    // const post = await Post.findById(id).populate('owner').populate('comments.owner')
    if (!post) throw new NotFound('Post not found')
    return res.json(post)
  } catch (err) {
    return sendError(err, res)
    // return res.json({ message: `Gah, errors! ${error}` })
    // return sendError(error, res)
  }
}


// * POST route
// Endpoint: /posts

export const createPost = async (req, res) => {
  try {
    // req.body.owner = req.loggedInUser._id
    const createdPost = await Post.create(req.body)
    return res.status(201).json(createdPost)
  } catch (err) {
    return sendError(err, res)
    // return res.json({ message: `Gah, errors! ${err}` })
    // return sendError(err, res)
  }
}

// * PUT route
// Endpoint: /posts/:id
export const editPost = async (req, res) => {
  try {
    const { id } = req.params
    const postToEdit = await Post.findById(id)
    if (!postToEdit) throw new NotFound('Post not found')
    // if (!postToEdit.owner.equals(req.loggedInUser._id)){
    //   throw new Error('Unauthorized')
    // }
    Object.assign(postToEdit, req.body)
    await postToEdit.save()
    return res.json(postToEdit)
  } catch (err) {
    console.log(err)
    return sendError(err, res)
    // return res.json({ message: `Gah, errors! ${err}` })
  }
}


// * DELETE route
// Endpoint: /posts/:id

export const deletedPost = async (req, res) => {
  try {
    const { id } = req.params
    const deletedPost = await Post.findByIdAndDelete(id)
    if (!deletedPost) throw new NotFound('Post not found')
    return res.sendStatus(204)
  } catch (err) {
    return sendError(err, res)
    // return res.json({ message: `Gah, errors! ${error}` })
    // return sendError(error, res)
  }
}