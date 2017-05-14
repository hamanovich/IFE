import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const NavigationBar = ({ logout, auth }) => {
  const userLinks = (
    <Nav pullRight>
      <LinkContainer to="/add-question">
        <NavItem>Add Question</NavItem>
      </LinkContainer>
      <NavDropdown title={auth.user.username || ''} id="account-dropdown">
        <LinkContainer to="/account"><MenuItem>Account</MenuItem></LinkContainer>
        <LinkContainer to={`/user/${auth.user._id}`}><MenuItem>Edit profile</MenuItem></LinkContainer>
        <MenuItem divider />
        <MenuItem onClick={logout}><Glyphicon glyph="lock" /> Logout</MenuItem>
      </NavDropdown>
    </Nav>
  );

  const guestLinks = (
    <Nav pullRight>
      <LinkContainer to="/signup">
        <NavItem>Sign Up</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>
    </Nav>
  );

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">IFE</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to="/questions">
          <NavItem>Questions</NavItem>
        </LinkContainer>
      </Nav>
      {auth.isAuthenticated ? userLinks : guestLinks}
    </Navbar>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object
};

NavigationBar.defaultProps = {
  auth: {}
};

export default NavigationBar;
