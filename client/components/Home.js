import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import qs from 'qs'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noodles from '../assets/img/noodles.jpg';
import Header from '../components/navigation/Header';
import FlashMessagesList from './flash/FlashMessagesList';
import AllRecipes from './recipes/AllRecipes';
import recipeSearch from '../action/recipes/recipeSearchAction';
import getAllRecipes from '../action/recipes/getAllRecipes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favoriteCount: 0,
      cloudinaryRecipeImage: '',
      searchQuery: '',
      recipes: {}
    }; // Initialize the state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  /**
   *  GET all recipes using API endpoint
   */
  componentDidMount() {
    this.props.recipeProps();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ recipes: nextProps.recipes });
  }

  onFocus(){
    this.context.router.history.push('/search');
  }

  onChange(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.recipeSearch(this.state.searchQuery);
  }

  render() {
    const { isFetching } = this.state;

    if (isFetching) {
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
              <form onSubmit={ this.onSubmit } >
              
                  <div className="input-group mt-2 mb-2 p-1">

                      <input 
                        type="text" 
                        className="form-control p-3" 
                        placeholder="Try: 'Jollof Rice' " 
                        aria-describedby="basic-addon2"
                        name="searchQuery"
                        value={ this.state.searchQuery }
                        // onChange={ this.onChange }
                        onFocus = { this.onFocus }
                        required
                      />

                      <input type="submit" value="SEARCH" className="btn btn-primary input-group-addon"/>
                  </div>
              </form>
              <div className="margin-top-50 margin-bottom-50"/>

              <div>
                <h3 className="popular-text">Most popular recipes</h3>
              </div>

              <div>
                <div className="row">
                {
                  Object
                    .keys(this.state.recipes)
                    .map(key => <AllRecipes key={key} details={this.state.recipes [key]} />)  
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

Home.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = ({recipes, isFetching, searchResult}) => ({
  recipes,
  isFetching,
  searchResult
});

const mapDispatchToProps = dispatch => {
  return {
    recipeProps: () => dispatch(getAllRecipes()),
    recipeSearch: searchContent => dispatch(recipeSearch(searchContent))
  }  
}

// Home.propTypes = {
//   recipeSearch: PropTypes.func.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(Home);