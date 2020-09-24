import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export function Navigation(props: { onSelect: (key: string | null) => any }) {
    const { onSelect } = props;
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">FLL Slovensko</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onSelect={onSelect}>
                    <Nav.Link eventKey="details">Details</Nav.Link>
                    <Nav.Link eventKey="teams">Teams</Nav.Link>
                    <Nav.Link eventKey="rgSchedule">RG Schedule</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link eventKey="ranking">Ranking</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link eventKey="catValues">Core Values</Nav.Link>
                    <Nav.Link eventKey="catProject">Project</Nav.Link>
                    <Nav.Link eventKey="catDesign">Robot Design</Nav.Link>
                    <Nav.Link eventKey="catGame">Robot Game</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
