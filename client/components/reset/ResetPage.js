import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import validate from '../../../server/validations/reset';
import { getReset, reset } from '../../actions/authActions';
import ResetForm from './ResetForm';
import { addFlashMessage } from '../../actions/flashMessages';

class ResetPage extends Component {
  static propTypes = {
    getReset: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    password: '',
    passwordConfirmation: '',
    errors: {}
  };

  componentDidMount() {
    const { router } = this.context;
    const { getReset, addFlashMessage } = this.props;

    getReset(router.params.token)
      .then((res) => {
        if (!res) {
          addFlashMessage({
            type: 'error',
            text: 'Password reset is invalid or expired'
          });
          router.push('/login');
        }
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid = () => {
    const errors = validate(this.state);

    if (!errors.isValid) this.setState({ errors });

    return errors.isValid;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { reset } = this.props;

    if (this.isValid()) {
      this.setState({ errors: {} });
      reset(this.context.router.params.token, this.state).then(
        (res) => {
          console.log('ACTION WORKs', res);
          this.context.router.push('/');
        },
        (err) => { console.log(err.response); this.setState({ errors: err.response.data.error }); }
      );
    }
  };

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <ResetForm state={this.state} handleSubmit={this.onSubmit} handleChange={this.onChange} />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { getReset, reset, addFlashMessage })(ResetPage);
