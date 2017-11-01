import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import qs from 'qs'
import noodles from '../assets/img/noodles.jpg';
import Header from '../components/navigation/Header';
import FlashMessagesList from './flash/FlashMessagesList';
import AllRecipes from './recipes/AllRecipes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favoriteCount: 0,
      cloudinaryRecipeImage: ''
    }; // Initialize the state
  }

  /**
   *  GET all recipes from the database table
   */
  componentWillMount() {

    setTimeout(() => this.setState({ isLoading: false }), 1000);
    axios.get('/api/v1/recipes')
    .then((recipe) => {
      this.setState({ details: recipe.data })
    })
    .catch((error) => {
      this.setState({ errors: error.response })
    })
  }

  render() {
    const { isLoading, favoriteCount } = this.state;

    if (isLoading) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    return (
      <div>

        {/* Header component for navigation */}
        <Header />
         
        {this.props.children}
        
          <div className="container margin-top-70">
          <FlashMessagesList />
          
              <h1
               className="text-center p-4 center-hero-title">Awesome Recipes Just For You</h1>
              <div>

              </div>
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

              <div>

                <div className="row">
                  {Object
                    .keys(this.state.details.recipes)
                    .map(key => <AllRecipes key={key} details={this.state.details.recipes[key]} />)  
                  }
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