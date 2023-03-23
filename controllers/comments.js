import Post from '../models/posts.js'
import { NotFound, sendError, Unauthorized } from '../config/errors.js'


export const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) throw new NotFound('Post not found :(')
    const commentToAdd = { ...req.body, owner: req.loggedInUser._id }
    console.log('POST', post)
    // console.log('COMMENT', commentToAdd)
    post.comments.push(commentToAdd)
    await post.save()
    return res.status(201).json(post)
  } catch (err) {
    console.log(err)
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params
    const loggedInUserId = req.loggedInUser._id
    const post = await Post.findById(postId)
    if (!post) throw new NotFound('Post not found :(')

    const commentToDelete = post.comments.id(commentId)
    if (!commentToDelete) throw new Error('Comment not found :(')
    if (!commentToDelete.owner.equals(loggedInUserId)){
      throw new Unauthorized('stop hacking or try logging in, dumbass')
    }
    await commentToDelete.deleteOne()
    await post.save()
    return res.sendStatus(204)
  } catch (err) {
    return sendError(err, res)
  }
}

