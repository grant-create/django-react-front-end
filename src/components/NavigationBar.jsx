
import {Nav, Navbar, Form, FormControl, Button, NavDropdown, Container} from 'react-bootstrap'

import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'



export default function NavigationBar(props){


// Was going to make a user log in, might eventually.


// ---------------------------- if the user is logged IN
const loggedIn = (
    <>
      <Navbar bg="dark" variant="dark">    
        <Nav>

          <Link className="nav-link" style={{marginTop: '20px', paddingLeft: '30px'}} to="/profile">Link</Link>
          <div style={{marginTop: '28px', paddingLeft: '20px', color: '#454e54'}}>|</div>
          <Link className="nav-link" style={{marginTop: '20px', paddingLeft: '30px'}} to="/"><span onClick={props.handleLogout}>Logout</span></Link>
        </Nav>
        
      </Navbar>
    </>
    )
    // ---------------------------- if the user is logged OUT
    const loggedOut = (
    <>
      <Navbar bg="dark" variant="dark" >
        <Nav className="mr-auto justify-content-end">
          <Link className="nav-link" style={{marginTop: '20px', paddingLeft: '30px', width: '95px'}} to="/login">Log in</Link><span style={{marginTop: '28px', paddingLeft: '10px', color: '#454e54'}}>|</span><Link className="nav-link" style={{marginTop: '20px', paddingLeft: '20px'}} to="/register">Register</Link>
        </Nav>
      </Navbar>
    </>
    )

// Nav bar is pretty minimal, was going to add more. Not really necessary at the moment.

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">Movie Favorites</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      
      
     
    </Nav>
    
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}