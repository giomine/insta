import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../models/users.js'
import { NotFound, Unauthorized, sendError } from './errors.js'



export const secureRoute = async (req, res, next) => {
  try {
    
    const authorization = req.headers.authorization
    if (!authorization) throw new Unauthorized('Missing Authorization header')
    const token = authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, process.env.SECRET)
    const loggedInUser = await User.findById(payload.sub)
    if (!loggedInUser) throw new NotFound('User not found')
    req.loggedInUser = loggedInUser

  } catch (error) {
    // console.log(error.status)
    // console.log(error.message)
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}