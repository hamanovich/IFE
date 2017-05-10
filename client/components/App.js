import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'react-bootstrap/lib/Grid';

import NavigationBar from './overall//NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import Footer from './overall/Footer';

import '../style.scss';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <NavigationBar />
        <Grid>
          <FlashMessagesList />
          {this.props.children}
        </Grid>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
