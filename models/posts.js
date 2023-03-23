import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 1000 },
  // owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const postSchema = new mongoose.Schema({
  caption: { type: String, required: true, maxLength: 1000 },
  image: { type: String, required: true },
  // owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  // comments: [commentSchema],
})

// ? virtual fields here? eg: number of likes
// postSchema.virtual('numOfLikes')
//   .get(function(){
//   })
// 
// postSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Post', postSchema)