import React, { Component } from 'react';
import { render } from 'react-dom';
import noodles from '../assets/img/noodles.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        
        <nav className="navbar navbar-expand-md navbar-dark navbar-bg-color fixed-top">
          <a className="navbar-brand navbar-brand-color" href="index.html">More Recipes</a>
          <button className="navbar-toggler hamburger-color-primary" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <nav className="navbar-nav ml-auto main-nav-menu">
                  <a href="../index.html" className="mr-2 btn nav-menu-active">Home</a>
                  <div className="dropdown-divider"/>
                  <a href="template/sign-up.html" className="mr-2 btn">Sign Up</a>
                  <div className="dropdown-divider"/>
                  <a href="template/sign-in.html" className="mr-2 btn">Sign In</a>
                  <div className="dropdown-divider"/>


                  <div className="dropdown show mr-5 main-nav-menu">
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
                  </div>
              </nav>
          </div>
        </nav>

          <div className="container margin-top-70">
            
              <h1 className="text-center p-4 center-hero-title">Awesome Recipes Just For You</h1>
              <form action="#" method="post">

                  <div className="input-group mt-2 mb-2 p-1">
                      <input type="text" className="form-control p-3" placeholder="Try: 'Jollof Rice' " aria-describedby="basic-addon2"/>
                      <input type="submit" value="SEARCH" className="btn btn-primary input-group-addon"/>
                  </div>
              </form>
              <div className="margin-top-50 margin-bottom-50"/>

              <div>
                <h3 className="popular-text">Most popular recipes</h3>
              </div>

              <div className="card-deck">
                <div className="card mt-1">
                    <img className="card-img-top" src={noodles} alt="Recipe image"/>
                    <div className="card-body">
                        <h4 className="card-title">Card title</h4>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="card-footer custom-card-footer-bg">
                            <p className="card-text"><small className="text-muted">30 <i className="fa fa-eye" aria-hidden="true"/> . 20 <i className="fa fa-thumbs-up" aria-hidden="true"/> . 42 <i className="fa fa-star" aria-hidden="true"/></small></p>
                            <a href="template/details.html" className="btn btn-primary btn-primary-color">View Recipe</a>
                        </div>
                    </div>
                </div>
                <div className="card mt-1">
                <img className="card-img-top" src={noodles} alt="Recipe image"/>
                    <div className="card-body">
                        <h4 className="card-title">Card title</h4>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="card-footer custom-card-footer-bg">
                            <p className="card-text"><small className="text-muted">30 <i className="fa fa-eye" aria-hidden="true"/> . 20 <i className="fa fa-thumbs-up" aria-hidden="true"/> . 42 <i className="fa fa-star" aria-hidden="true"/></small></p>
                            <a href="template/details.html" className="btn btn-primary btn-primary-color">View Recipe</a>
                        </div>
                    </div>
                </div>

                <div className="card mt-1">
                <img className="card-img-top" src={noodles} alt="Recipe image"/>
                <div className="card-body">
                    <h4 className="card-title">Card title</h4>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div className="card-footer custom-card-footer-bg">
                        <p className="card-text"><small className="text-muted">30 <i className="fa fa-eye" aria-hidden="true"/> . 20 <i className="fa fa-thumbs-up" aria-hidden="true"/> . 42 <i className="fa fa-star" aria-hidden="true"/></small></p>
                        <a href="template/details.html" className="btn btn-primary btn-primary-color">View Recipe</a>
                    </div>
                </div>
              </div>
          </div>

          <div className="clearfix mt-4"/>
          {/* Bottom Navigation */}
          <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                  <a className="page-link" href="#">Previous</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                  </li>
              </ul>
          </nav>

          </div>
      
      </div>
    );
  }
}

export default Home;