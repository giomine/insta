import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { isAuthenticated, handleLogout } from '../../helpers/auth'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const PageNavbar = () => {
  const navigate = useNavigate()

  return (

    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          <img 
            src="https://newbuildings.org/wp-content/uploads/2015/03/client-logo.png"
            alt = "logo"
            width ="100px"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-nav" />
        <Navbar.Collapse id="app-nav" className="justify-content-end">
          <Nav>
            <Nav.Link to="/" as={Link} eventKey='1'> Home </Nav.Link>
            { isAuthenticated() ? 
              <>
                <Nav.Link to="/profile" as={Link} eventKey='2'> Profile </Nav.Link>
                <Nav.Link eventKey='3'><span onClick = {() => handleLogout(navigate)}>Logout</span></Nav.Link>
                {/* <span className='nav-link' onClick = {() => handleLogout(navigate)}>Logout</span> */}
                
              </>
              :
              <>
                <Nav.Link to="/login" as={Link} eventKey='4'> Login </Nav.Link>
                <Nav.Link to="/register" as={Link} eventKey='5'> Register </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default PageNavbar
