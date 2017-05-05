import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';

const FlashMessage = ({ close, message }) => (
  <Alert bsStyle={message.type === 'error' ? 'danger' : 'success'}>
    {message.text}
    <button onClick={close} className="close"><span>&times;</span></button>
  </Alert>
);

FlashMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  close: PropTypes.func.isRequired
};

export default FlashMessage;
