import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(userPasswordConfirmation){
    this._passwordConfirmation = userPasswordConfirmation
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

export default mongoose.model('User', userSchema)