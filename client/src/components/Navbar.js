import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class MainNav extends React.Component {
  render() {
    return (  
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default MainNav;

/*

Sign in page
  Click sign in -> Go to main

Navbar along the top
- Home
  - Exp/Stamina
- Manage Party
  - Entries for characters to select
- Upgrades
  - Currency display
  - upgrades.paintfile
- Recruit
  - Currency display
  - Make basic UI
- Friend List
  - Mock up with fake friends
- Options
  - Not yet
*/
