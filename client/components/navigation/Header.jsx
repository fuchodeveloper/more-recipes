import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import capitalize from 'lodash.capitalize';
import { logout } from '../../action/authentication/loginAction';

class Header extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  /**
   *
   *
   * @returns
   * @memberof Header
   */
  render() {
    const { isAuthenticated, user: { firstName } } = this.props.login;
    /**
     * Links available to logged in users
     */

    const userLinks = (
      <div className="navbar-nav ml-auto main-nav-menu">
        <div className="dropdown show mr-5 main-nav-menu">
          <a className="dropdown-toggle btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <strong>{capitalize(this.props.login.user.firstName)}</strong>
          </a>

          <div className="dropdown-menu main-nav-menu width-5" aria-labelledby="dropdownMenuLink">
            <Link className="dropdown-item" to="/profile">Profile</Link>
            <Link className="dropdown-item" to="/add">Add Recipe</Link>
            <Link className="dropdown-item" to="/categories">Categories</Link>
            <Link className="dropdown-item" to="/favorites">Favorite Recipes</Link>
            <Link className="dropdown-item" to={`/${firstName}/recipes`}>My Recipes</Link>
            <Link className="dropdown-item" to="/votes">Most Upvoted</Link>
            <a className="dropdown-item" href="#" onClick={this.logout.bind(this)}>Logout</a>
          </div>
        </div>
      </div>
    );

    /**
     * Links available to guests
     */
    const guestLinks = (
      <div className="navbar-nav ml-auto main-nav-menu">
        <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
        <Link className="nav-item nav-link" to="/login">Sign In</Link>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <a className="navbar-brand navbar-brand-color"
           href="/">More Recipes</a>
          <button 
            className="navbar-toggler hamburger-color-primary"
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-white" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  login: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    login: state.login
  };
}


export default connect(mapStateToProps, { logout })(Header);
