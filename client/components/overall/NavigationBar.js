import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import { logout } from '../../actions/authActions';

class NavigationBar extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <Nav pullRight>
        <LinkContainer to="/add-question">
          <NavItem>Add Question</NavItem>
        </LinkContainer>
        <LinkContainer to="/account">
          <NavItem>Account</NavItem>
        </LinkContainer>
        <NavItem onClick={this.logout}>Logout</NavItem>
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
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout }, null, {
  pure: false
})(NavigationBar);
