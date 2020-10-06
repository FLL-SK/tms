import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export function Navigation(props: { onSelect: (key: string | null) => any }) {
    const { onSelect } = props;
    return (
        <Navbar collapseOnSelect expand={false} bg="dark" variant="dark">
            <Navbar.Brand href="/">FLL Slovensko</Navbar.Brand>
            <Navbar.Toggle className="order-first" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onSelect={onSelect}>
                    <Nav.Link href="/">Profile</Nav.Link>
                    <Nav.Link href="/login">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
