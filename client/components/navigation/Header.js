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
    /**
     * Links available to logged in users
     */

    const userLinks = (
     <div>
       <div className="dropdown show mr-5 main-nav-menu">
          <a className="dropdown-toggle btn btn-block" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              John
          </a>

          <div className="dropdown-menu main-nav-menu width-5" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="template/profile.html">Profile</a>
            <Link className="dropdown-item" to="add_recipe">Add Recipe</Link>
            <a className="dropdown-item" href="template/category.html">Category</a>
            <a className="dropdown-item" href="template/favorite_recipes.html">Favorite Recipes</a>
            <a className="dropdown-item" href="template/my_recipes.html">My Recipes</a>
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
                  
                  {/* <div className="dropdown-divider"/>
                  <Link to="/signup" className="mr-2 btn">Sign Up</Link>
                  <div className="dropdown-divider"/>
                  <Link to="/login" className="mr-2 btn">Sign In</Link>
                  <div className="dropdown-divider"/> */}


                  {/* <div className="dropdown show mr-5 main-nav-menu">
                      <a className="dropdown-toggle btn btn-block" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          John
                      </a>

                      <div className="dropdown-menu main-nav-menu width-5" aria-labelledby="dropdownMenuLink">
                          <a className="dropdown-item" href="template/profile.html">Profile</a>
                          <a className="dropdown-item" href="template/add_recipe.html">Add Recipe</a>
                          <a className="dropdown-item" href="template/category.html">Category</a>
                          <a className="dropdown-item" href="template/favorite_recipes.html">Favorite Recipes</a>
                          <a className="dropdown-item" href="template/my_recipes.html">My Recipes</a>
                      </div>
                  </div> */}
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