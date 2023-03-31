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

// * GET bio route
// Endpoint: /profile/:id/edit
export const getBio = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    const bio = user.bio
    return res.json(bio)
  } catch (err) {
    return sendError(err, res)
  }
}


// * PUT bio route
// Endpoint: /profile/:id/edit
export const editBio = async (req, res) => {
  try {
    const { id } = req.params
    const profileToEdit = await User.findById(id)
    if (!profileToEdit) throw new NotFound('User not found')
    // const bioToEdit = profileToEdit.bio
    Object.assign(profileToEdit, req.body)
    profileToEdit.passwordConfirmation = profileToEdit.password
    await profileToEdit.save()
    return res.json(profileToEdit)
  } catch (err) {
    return sendError(err, res)
  }
}

// * GET profile picture route
// Endpoint: /profile/:id/edit-picture
export const getPicture = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    const picture = user.profilePhoto
    return res.json(picture)
  } catch (err) {
    return sendError(err, res)
  }
}

// * PUT profile picture route
// Endpoint: /profile/:id/edit-picture
export const changePicture = async (req, res) => {
  try {
    const { id } = req.params
    const photoToChange = await User.findById(id)
    if (!photoToChange) throw new NotFound('User not found')
    // const bioToEdit = profileToEdit.bio
    Object.assign(photoToChange, req.body)
    photoToChange.passwordConfirmation = photoToChange.password
    await photoToChange.save()
    return res.json(photoToChange)
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