import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const NavigationBar = ({ logout, isAuthenticated }) => {
  const userLinks = (
    <Nav pullRight>
      <LinkContainer to="/add-question">
        <NavItem>Add Question</NavItem>
      </LinkContainer>
      <LinkContainer to="/account">
        <NavItem>Account</NavItem>
      </LinkContainer>
      <NavItem onClick={logout}>Logout</NavItem>
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
      {isAuthenticated ? userLinks : guestLinks}
    </Navbar>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default NavigationBar;
