import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import { setToken } from '../../helpers/auth'

const Login = () => {

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')


  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formFieldsUpdated = { ...formFields, email: formFields.email.toLowerCase() }
      const response = await axios.post('/api/login', formFieldsUpdated)
      // console.log(formFieldsUpdated)
      setToken(response.data.token)
      navigate('/')
    } catch (err) {
      // console.log(err)
      setError(err.response.data.message)
    }
  }

  return (
    <main className="register-form-container">
      <div className="register-border">
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input type="email" name="email" placeholder="email" onChange={handleChange} value={formFields.email} />
              <input type="password" name="password" placeholder="password" onChange={handleChange} value={formFields.password} />
              <button>Login</button>
              {error && <p className='text-center'>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login