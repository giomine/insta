import { NotFound, sendError, Unauthorized } from '../config/errors.js'
import User from '../models/users.js'

// * GET route
// Endpoint: /profile
export const profileView = async (req, res) => {
  try {
    const profile = await req.loggedInUser.populate('posts')
    return res.json(profile)
  } catch (err) {
    return sendError(err, res)
  }
}


// * PUT route TODO
// Endpoint: /profile/:id/edit
export const editBio = async (req, res) => {
  try {
    const { id } = req.params
    const profileToEdit = await User.findById(id)
    if (!profileToEdit) throw new NotFound('User not found')
    // if (!profileToEdit.owner.equals(req.loggedInUser._id)){
    //   throw new Error('Unauthorized')
    // }
    Object.assign(profileToEdit, req.body)
    await profileToEdit.save()
    return res.json(profileToEdit)
  } catch (err) {
    return sendError(err, res)
  }
}



// * GET route
export const otherUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    // const profile = await User.findById(id)
    const profile = await User.findById(id).populate('posts')
    if (!profile) throw new NotFound('User not found')
    return res.json(profile)
  } catch (err) {
    return sendError(err, res)
  }
}


// * PUT route
// Endpoint: /profile/:id
// export const editProfile = async (req, res) => {
//   try {
//     const { id } = req.params
//     console.log(id)
//     const profileToEdit = await User.findById(id)
//     console.log('PROFILE --->', profileToEdit)
//     if (!profileToEdit) throw new NotFound('Profile not found')
//     if (!profileToEdit.owner.equals(req.loggedInUser._id)){
//       throw new Error('Unauthorized')
//     }
//     Object.assign(profileToEdit, req.body)
//     await profileToEdit.save()
//     return res.json(profileToEdit)
//   } catch (err) {
//     console.log(err)
//     // return sendError(err, res)
//     return res.json({ message: `Gah, errors! ${err}` })
//   }
// }