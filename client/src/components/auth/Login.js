import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = () => {

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/login', formFields)
      localStorage.setItem('My Token', response.data.token)
      console.log(response.data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="login-page">
      <Container>
        <Row>
          <Col as="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">email</label>
            <input type="email" name="email" placeholder="enter you email here" onChange={handleChange} value={formFields.email} />
            <label htmlFor="password">password</label>
            <input type="password" name="password" placeholder="enter you password here" onChange={handleChange} value={formFields.password} />
            <button>Login</button>
          </Col>
        </Row>
      </Container>


    </main>
  )
}

export default Login