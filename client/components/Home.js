import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import noodles from '../assets/img/noodles.jpg';
import Header from '../components/navigation/Header';
import FlashMessagesList from './flash/FlashMessagesList';

class Home extends Component {
  render() {
    return (
      <div>
        {/* Header component for navigation */}
        <Header />
        
        
        {this.props.children}
        
          <div className="container margin-top-70">
          <FlashMessagesList />
          
              <h1 className="text-center p-4 center-hero-title">Awesome Recipes Just For You</h1>
              <FlashMessagesList />
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
                            <Link to="/details" className="btn btn-primary btn-primary-color">View Recipe</Link>
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