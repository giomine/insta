import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

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
      const response = await axios.post('/api/login', formFields)
      // localStorage.setItem('user-token', response.data.token)
      setToken(response.data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
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
              {/* <label htmlFor="email">email</label> */}
              <input type="email" name="email" placeholder="email" onChange={handleChange} value={formFields.email} />
              {/* <label htmlFor="password">password</label> */}
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