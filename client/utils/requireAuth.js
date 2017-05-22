import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectUser } from '../selectors';
import { addFlashMessage } from '../actions/flashMessages';

export default (ComposedComponent) => {
  class Authenticate extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      addFlashMessage: PropTypes.func.isRequired
      // authorId: PropTypes.string,
      // author: PropTypes.object
    };

    static contextTypes = {
      router: PropTypes.object.isRequired
    };

    // static defaultProps = {
    //   authorId: null,
    //   author: {}
    // };

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

    // componentDidUpdate() {
    //   const { isAuthenticated, addFlashMessage, authorId, author } = this.props;
    //   console.log(author, authorId, this.context.router.routes);

    //   if (authorId !== author._id && isAuthenticated) {
    //     addFlashMessage({
    //       type: 'error',
    //       text: 'You have no access to edit not your quesiton.'
    //     });

    //     this.context.router.push('/questions');
    //   }
    // }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state, props) => {
    const question = state.questions.find(question => question._id === props.params._id);

    return {
      isAuthenticated: state.auth.isAuthenticated,
      authorId: selectUser(state)._id,
      author: question && question.author
    };
  };

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
};
