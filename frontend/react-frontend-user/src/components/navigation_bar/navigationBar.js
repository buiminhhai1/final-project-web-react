import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import './navigationBar.css';

export default class navigationBar extends Component {
  render() {
    return (
      <header>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Tutors for everybody</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="ml-auto user-menu">
              <Nav.Link href="#home">Sign in</Nav.Link>
              <Nav.Link href="#link">Sign up</Nav.Link>
              <NavDropdown title="Setting" alignRight id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}
