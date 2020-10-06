import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export function Navigation(props: { onSelect: (key: string | null) => any }) {
    const { onSelect } = props;
    return (
        <Navbar collapseOnSelect expand={false} bg="dark" variant="dark">
            <Navbar.Brand href="#home">FLL Slovensko</Navbar.Brand>
            <Navbar.Toggle className="order-first" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onSelect={onSelect}>
                    <Nav.Link href="/">Profile</Nav.Link>
                    <Nav.Link href="/login">Logout</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link eventKey="details">Details</Nav.Link>
                    <Nav.Link eventKey="teams">Teams</Nav.Link>
                    <Nav.Link eventKey="rgSchedule">RG Schedule</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link eventKey="catValues">Core Values</Nav.Link>
                    <Nav.Link eventKey="catProject">Project</Nav.Link>
                    <Nav.Link eventKey="catDesign">Robot Design</Nav.Link>
                    <Nav.Link eventKey="catGame">Robot Game</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link eventKey="scoreTable">Scores</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
