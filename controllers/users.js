import { NotFound, sendError, Unauthorized } from '../config/errors.js'

export const profileView = async (req, res) => {
  try {
    const profile = await req.loggedInUser.populate('posts')
    return res.json(profile)
  } catch (err) {
    return sendError(err, res)
  }
}