import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';

class AccountPage extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div className="row">
        <aside className="col-md-3 col-sm-4">
          <div className="list-group">
            <Link to={`/questions/author:${this.props.username}`} className="list-group-item">Questions</Link>
            <Link to="/add-question" className="list-group-item">Add question</Link>
            <a href="" className="list-group-item" onClick={this.logout}>Logout</a>
          </div>
        </aside>
        <div className="col-md-9 col-sm-8">
          <h1>Account: {this.props.username}</h1>
        </div>
      </div>
    );
  }
}

AccountPage.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

AccountPage.defaultProps = {
  username: 'Anonim'
};

const mapStateToProps = state => ({
  username: state.auth.user.username
});

export default connect(mapStateToProps, { logout })(AccountPage);
