import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout, getToken } from '../../helpers/auth'
import axios from 'axios'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const PageNavbar = () => {
  const [ profile, setProfile ] = useState('')
  const navigate = useNavigate()

  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setProfile(response.data)
      } catch (err){
        console.log(err)
      }
    }
    getProfile()
  }, [setTimeout(() => {}), 1000])

  return (
    <>
      <Navbar className='nav-mobile'>
        <Container>
          <Navbar.Brand onClick={handleClick} to="/" as={Link}>
            Instasham
          </Navbar.Brand>
          <Nav>
            { isAuthenticated() ? 
              profile &&
              <>
                {/* <Nav.Link to="/profile" as={Link} style={{ backgroundImage: `url('${profile.profilePhoto}')` }} className='nav-profile'></Nav.Link>
                <Nav.Link ><span onClick = {() => handleLogout(navigate)}><i className="fa-solid fa-right-from-bracket"></i></span></Nav.Link> */}
                
              </>
              :
              <>
                <Nav.Link to="/login" as={Link} > Login </Nav.Link>
                <Nav.Link to="/register" as={Link} > Register </Nav.Link>
              </>
            }
          </Nav>
        </Container>
      </Navbar>


      <Navbar>
        <Container>
          <Navbar.Brand className='mobile-none' to="/" as={Link}>
            Instasham
          </Navbar.Brand>
          <Nav>
            { isAuthenticated() ? 
              <>
                <Nav.Link onClick={handleClick} to="/" as={Link} > <i className="fa-solid fa-house fa-lg fa"></i> </Nav.Link>
                <Nav.Link to="/profile" as={Link} style={{ backgroundImage: `url('${profile.profilePhoto}')` }} className='nav-profile'></Nav.Link>
                <Nav.Link ><span onClick = {() => handleLogout(navigate)}><i className="fa-solid fa-right-from-bracket fa"></i></span></Nav.Link>
              </>
              :
              <>
                <Nav.Link className='mobile-none' to="/login" as={Link} > Login </Nav.Link>
                <Nav.Link className='mobile-none' to="/register" as={Link} > Register </Nav.Link>
              </>
            }
          </Nav>
        </Container>
      </Navbar>

    </>
  )
}

export default PageNavbar
