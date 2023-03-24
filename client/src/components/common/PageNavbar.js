import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const PageNavbar = () => {

  const handleLogOut = () => {
    console.log('Logged Out ')
  }

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          <img 
            src="https://newbuildings.org/wp-content/uploads/2015/03/client-logo.png"
            width ="100px"
            alt = "logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-nav" />
        <Navbar.Collapse id="app-nav" className="justify-content-end">
          <Nav>
            <Nav.Link to="/" as={Link}> Home </Nav.Link>
            <Nav.Link to="/login" as={Link}> Login </Nav.Link>
            <Nav.Link to="/register" as={Link}> Register </Nav.Link>
            <Nav.Link to="/profile" as={Link}> Profile </Nav.Link>
            <Nav.Link onClick={ handleLogOut }> Log Out </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default PageNavbar
