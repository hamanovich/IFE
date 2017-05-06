import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';
import { deleteFlashMessage, deleteFlashMessages } from '../../actions/flashMessages';

class FlashMessagesList extends Component {
  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.messages.length > 0) {
        this.props.deleteFlashMessages();
      }
    }, 2500);
  }

  render() {
    const { deleteFlashMessage } = this.props;
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} close={() => deleteFlashMessage(message.id)} />
    );

    return (
      <div>
        {messages}
      </div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
  deleteFlashMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ messages: state.flashMessages });

export default connect(mapStateToProps, { deleteFlashMessage, deleteFlashMessages })(FlashMessagesList);
