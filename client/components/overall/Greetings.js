import React from 'react';
import PropTypes from 'prop-types';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const Greetings = ({ user }) => (
  <Jumbotron>
    <h1>Welcome, {user.username || 'Anonim'}</h1>
  </Jumbotron>
);

Greetings.propTypes = {
  user: PropTypes.object
};

Greetings.defaultProps = {
  user: null
};

export default Greetings;
