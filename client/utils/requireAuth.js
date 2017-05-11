import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default (ComposedComponent) => {
  class Authenticate extends Component {
    componentWillMount() {
      const { addFlashMessage, isAuthenticated } = this.props;

      if (!isAuthenticated) {
        addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });

        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    componentDidUpdate() {
      const { isAuthenticated, addFlashMessage, username, author } = this.props;
      if (username !== author && isAuthenticated) {
        addFlashMessage({
          type: 'error',
          text: 'You have no access to edit not your quesiton.'
        });

        this.context.router.push('/questions');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    username: PropTypes.string,
    author: PropTypes.string
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  Authenticate.defaultProps = {
    username: null,
    author: null
  };

  const mapStateToProps = (state, props) => {
    const question = state.questions.find(question => question._id === props.params._id);

    return {
      isAuthenticated: state.auth.isAuthenticated,
      username: state.auth.user.username,
      author: question && question.author
    };
  };

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
};
