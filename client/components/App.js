import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';

import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

import '../style.scss';

class App extends Component {  
  render() {
    return (
      <Grid>
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </Grid>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
