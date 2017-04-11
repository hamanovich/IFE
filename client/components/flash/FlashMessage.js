import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {
  componentDidMount() {
    setTimeout(this.onClick.bind(this), 2500);
  }

  onClick = () => {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text } = this.props.message;

    return (
      <div
        className={classnames('alert', {
          'alert-success': type === 'success',
          'alert-danger': type === 'error'
        })}
      >
        {text}
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
