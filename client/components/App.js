import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavigationBar from './NavigationBar';

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
