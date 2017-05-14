import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
// import delay from 'lodash/delay';

// import { FLASH_TIMEOUT } from '../../utils/constants';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage, deleteFlashMessages } from '../../actions/flashMessages';

class FlashMessagesList extends Component {
  // componentDidUpdate() {
    // const { messages, deleteFlashMessages } = this.props;
    // delay(() => [...messages] && deleteFlashMessages(), FLASH_TIMEOUT);
  // }

  render() {
    const { deleteFlashMessage, messages } = this.props;
    const flashMessages = map(messages, message =>
      <FlashMessage key={message.id} message={message} close={() => deleteFlashMessage(message.id)} />
    );

    return (
      <div>
        {flashMessages}
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
