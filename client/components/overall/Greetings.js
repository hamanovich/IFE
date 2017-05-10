import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const Greetings = ({ username }) => (
  <Jumbotron>
    <h1>Welcome, {username}</h1>
  </Jumbotron>
);

Greetings.propTypes = {
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  username: state.auth.user.username || 'Anonim'
});

export default connect(mapStateToProps)(Greetings);
