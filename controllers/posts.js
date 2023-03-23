import Post from '../models/posts.js'


export const editPost = async (req, res) => {
  try {
    const { id } = req.params
    const postToEdit = await Post.findById(id)
    if (!postToEdit) throw new Error('Post not found')
    // if (!postToEdit.owner.equals(req.loggedInUser._id)){
    //   throw new Error('Unauthorized')
    // }
    Object.assign(postToEdit, req.body)
    await postToEdit.save()
    return res.json(postToEdit)
  } catch (err) {
    console.log(err)
    return res.json({ message: `Gah, errors! ${err}` })
  }
}