import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { sendError } from '../config/errors.js'

// * REGISTER ROUTE
// Endpoint: /register

export const registerUser = async (req, res) => {
  try {
    // console.log('REQ.BODY -->', req.body)
    const newUser = await User.create(req.body)
    // console.log(newUser)
    return res.json({ message: `Welcome ${newUser.username}!` })

  } catch (error) {
    return sendError(error, res)
  }
}

// * LOGIN ROUTE
// Endpoint: /login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: email })
    // console.log(userToLogin)
    const userIsValidated = await userToLogin.validatePassword(password)
    if (!userToLogin || !userIsValidated){
      throw new Error()
    }

    //JWT
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7d' })

    return res.json( { message: `Welcome back, ${userToLogin.username}`, token: token })

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
