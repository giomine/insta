import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import 'dotenv/config'

const app = express()

const startServer = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('CONNECTED!')

    app.use(express.json())

    app.use((req, res, next) => {
      console.log(`Incoming request: ${req.method} ${req.url}`)
      next()
    })

    // When routes are ready, this will be replaced with:
    app.use('/api', router)
    app.use(router)
    // app.get('/insta', (req, res) => {
    //   return res.json({ message: 'Welcome to home page :)' })
    // })

    app.use((req, res) => {
      return res.status(404).json({ message: 'Route not found' })
    })

    app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))
  } catch (err) {
    console.log(`Oops, something went wrong starting the app. ${err}`)
  }
}

startServer()