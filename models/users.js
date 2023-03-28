import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, required: false },
})

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'owner',
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(userPasswordConfirmation){
    this._passwordConfirmation = userPasswordConfirmation
  })

userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc,ret){
    delete ret.password
  },
})

userSchema.pre('validate', function(next){
  if (this.password !== this._passwordConfirmation){
    this.invalidate('passwordConfirmation', 'Hmmm, the passwords don\'t match :/')
  }
  next()
})

userSchema.pre('save', function(next){
  if (this.isModified('password')){
    const salt = bcrypt.genSaltSync(12)
    this.password = bcrypt.hashSync(this.password, salt)
  }
  next()
})

userSchema.methods.validatePassword = function(plainTextPassword){
  return bcrypt.compare(plainTextPassword, this.password)
}

export default mongoose.model('User', userSchema)