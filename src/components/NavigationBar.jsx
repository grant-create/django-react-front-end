
import {Nav, Navbar, Form, FormControl, Button, NavDropdown, Container} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'



export default function NavigationBar(props){

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

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
     
    </Nav>
    
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}