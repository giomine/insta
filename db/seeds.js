import mongoose from 'mongoose'
import 'dotenv/config'

// Models
import Post from '../models/posts.js'
import User from '../models/users.js'

// Data
import postData from './data/posts.js'
import userData from './data/users.js'


const seedDatabase = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('DB connection established')

    await mongoose.connection.db.dropDatabase()
    console.log('DB dropped')

    const createdUsers = await User.create(userData)

    const postsWithOwner = postData.map(post => {
      return { ...post, owner: createdUsers[0]._id }
    })

    const createdPosts = await Post.create(postsWithOwner)
    console.log(` ${createdPosts.length} posts added`)

    await mongoose.connection.close()
    console.log('Conenction closed')

  } catch (error) {
    console.log(error)
    await mongoose.connection.close()
  }
}

seedDatabase()