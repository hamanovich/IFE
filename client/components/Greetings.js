import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Greetings = ({ username }) => (
  <div className="jumbotron">
    <h1>Welcome, {username}</h1>
  </div>
);

Greetings.propTypes = {
  username: PropTypes.string.isRequired
};

Greetings.defaultProps = {
  username: 'Anonim'
};

const mapStateToProps = state => ({
  username: state.auth.user.username
});

export default connect(mapStateToProps)(Greetings);
