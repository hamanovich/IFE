import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';

import NavigationBar from './overall//NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import Footer from './overall/Footer';

import { logout } from '../actions/authActions';

import '../style.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { auth } = this.props;
    return (
      <div className="wrapper">
        <NavigationBar auth={auth} logout={this.logout} />
        <Grid>
          <FlashMessagesList />
          {React.cloneElement(this.props.children, { user: auth.user })}
        </Grid>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(App);
