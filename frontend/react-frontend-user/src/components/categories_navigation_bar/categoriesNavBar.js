import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';

export default class categoriesNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: ["Math", "Literature", "Physics", "Chemistry", "English"]
        };
    }

    render() {
        return (
            <Navbar bg="warning shadow p-0">
                <Nav className="m-auto">
                    {this.state.subjects.map(subject => {
                        return (
                            <Nav.Link href={'#' + subject}>{subject}</Nav.Link>
                        )
                    })}
                    <Nav.Link href='#all'>All categories</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}
