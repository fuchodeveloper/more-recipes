import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import capitalize from 'lodash.capitalize';
import logoutAction from '../../action/authentication/logoutAction';

/**
 * @description class for app header
 *
 * @class Header
 * @extends {React.Component}
 */
export class Header extends React.Component {
  /**
   * Creates an instance of Header.
   * @param {Object} props
   *
   * @memberof Header
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
 * @description handle user log out
 *
 * @param {Object} event
 *
 * @memberof Header
 *
 * @returns {undefined}
 */
  logout(event) {
    event.preventDefault();
    this.props.logoutProps();
  }

  /**
   * @description Render the JSX template
   *
   * @returns {JSX} render JSX template
   *
   * @memberof Header
   */
  render() {
    const { isAuthenticated, user: { firstName } } = this.props.auth;
    /**
     * Links available to logged in users
     */

    const userLinks = (
      <div className="navbar-nav ml-auto main-nav-menu">
        <div className="dropdown show mr-5 main-nav-menu">
          <a
            className="dropdown-toggle btn"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <strong>{capitalize(this.props.auth.user.firstName)}</strong>
          </a>

          <div
            className="dropdown-menu main-nav-menu width-5 dropdown-menu-right"
            aria-labelledby="dropdownMenuLink"
          >
            <Link className="dropdown-item" to="/profile">Profile</Link>
            <Link className="dropdown-item" to="/add">Add Recipe</Link>
            <Link className="dropdown-item" to="/favorites">
            Favorite Recipes
            </Link>
            <Link className="dropdown-item" to={`/${firstName}/recipes`}>
            My Recipes
            </Link>
            <Link className="dropdown-item" to="/votes">
            Most Upvoted
            </Link>
            <a className="dropdown-item" href="#" onClick={this.logout}>
            Logout
            </a>
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
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        >
          <Link
            className="navbar-brand navbar-brand-color"
            to="/"
          >More Recipes
          </Link>
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

Header.defaultProps = {
  auth: {}
};

Header.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      firstName: PropTypes.string
    })
  }),
  logoutProps: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logoutProps: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
