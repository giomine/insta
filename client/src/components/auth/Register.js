import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [ error, setError ] = useState('')

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    bio: '',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(formFields)
      const formFieldsUpdated = { ...formFields, email: formFields.email.toLowerCase() }
      // console.log(formFieldsUpdated)
      await axios.post('/api/register', formFieldsUpdated)

      navigate('/login')
    } catch (err) {
      // console.log(err)
      setError('Please fill all fields and if you already have an account log in instead')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (

    <div className='register-form-container'>
      <div className="register-border">
        <form action="" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="username"></label>
          <input type="text" name="username" placeholder='username' onChange={handleChange} value={formFields.username} />
          <label htmlFor="email"></label>
          <input type="email" name="email" placeholder="email" onChange={handleChange} value={formFields.email} />
          <label htmlFor="bio"></label>
          <input type="text" name="bio" placeholder='your bio' onChange={handleChange} value={formFields.bio} />
          <label htmlFor="password"></label>
          <input type="password" name="password" placeholder="password" onChange={handleChange} value={formFields.password} />
          <label htmlFor="passwordConfirmation"></label>
          <input type="password" name="passwordConfirmation" placeholder='confirm password' onChange={handleChange} value={formFields.passwordConfirmation} />
          <button>Register</button>
          {error && <p className='text-center'>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Register