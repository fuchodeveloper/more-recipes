import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

    const { isAuthenticated } = this.props.login;
    const id = this.props.login.user.id;
    /**
     * Links available to logged in users
     */

    const userLinks = (
     <div>
       <div className="dropdown show mr-5 main-nav-menu">
          <a className="dropdown-toggle btn btn-block" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Welcome
          </a>

          <div className="dropdown-menu main-nav-menu width-5" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="template/profile.html">Profile</a>
            <Link className="dropdown-item" to="/add_recipe">Add Recipe</Link>
            <a className="dropdown-item" href="template/category.html">Category</a>
            <Link className="dropdown-item" to={`/${id}/my_favorites`}>Favorite Recipes</Link>
            <Link className="dropdown-item" to="/my_recipes">My Recipes</Link>
            <Link className="dropdown-item" to="/most_voted">Most Upvoted</Link>
            <a className="dropdown-item" href="#" onClick={this.logout.bind(this)}>Logout</a>
          </div>
        </div>
     </div>
    );

    /**
     * Links available to guests
     */
    const guestLinks = (
      <div>
        <Link to="/signup" className="mr-2 btn">Sign Up</Link>
        <Link to="/login" className="mr-2 btn">Sign In</Link>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark navbar-bg-color fixed-top">
          <a className="navbar-brand navbar-brand-color" href="/">More Recipes</a>
          <button className="navbar-toggler hamburger-color-primary" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <nav className="navbar-nav ml-auto main-nav-menu">
                  <Link to="/" className="mr-2 btn nav-menu-active">Home</Link>
                  { isAuthenticated ? userLinks : guestLinks }
              </nav>
          </div>
        </nav>
      </div>
    )
  }
}

Header.propTypes = {
  login: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
  
function mapStateToProps(state) {
  return {
      login: state.login
  };
}
  

export default connect(mapStateToProps, { logout })(Header);