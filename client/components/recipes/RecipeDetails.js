import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import noodles from '../../assets/img/noodles.jpg';
import { getAllRecipes } from '../../action/recipes/recipeDetails';
import { createFavorite } from '../../action/favorites/createFavorite';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favorited: '',
      recipeDelete: '',
      favoriteCount: 0
    }; // Initialize the state
  }


  componentDidMount() {
    const { param } = this.props;

    setTimeout(() => this.setState({ isLoading: false }), 1000);
    axios.get('/api/v1/recipes/' + param)
        .then((recipe) => {
          console.log(recipe.data);
      return this.setState({ details: recipe.data })
    })
    .catch((error) => {
      this.setState({ errors: error.response })
    })
  }

  createFavorite(e) {
    e.preventDefault();
    const { param } = this.props;

    return axios.post(`/api/v1/users/${param}/recipes`)
      .then((favorite) => {
        alert(error.response.data.message);
        this.setState({ favorited: favorite.response.data.message })
      })
      .catch((error) => {
        alert(error.response.data.error);
        this.setState({ errors: error.response.data.error })
      })
  }

  deleteRecipe(e) {
    e.preventDefault();
    const { param } = this.props;

    return axios.delete(`/api/v1/recipes/${param}`)
      .then((recipeDelete) => {
        console.log(recipeDelete);
        // console.log(recipeDelete.data.error);
        this.setState({ favorited: recipeDelete.response.data.message })
      })
      .catch((error) => {
        alert(error.response.data.error);
        this.setState({ errors: error })
      })
  }
  
  render() {
    const { isLoading, details, favoriteCount } = this.state;

    if (isLoading) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    return (
      <div>
        <div className="overlay margin-top-50">
            <div className="jumbotron recipe-header-background">
                <div className="container recipe-overlay-text">
                    <h1 className="display-3 recipe-title">Recipe: {details.recipe.recipeName}</h1>
                    <p className="recipe-author"><em>By: John Doe</em></p>
                </div>
            </div>
        </div>

        <div className="container">
          <div className="mb-4">
            <span className="recipe-title">Recipe Ingredients</span>
            <span className="float-right recipe-ratings-right text-muted">{details.recipe.views} <i className="fa fa-eye" aria-hidden="true"/> <span className="big-pipe">.</span> {details.recipe.upVotes} <i className="fa fa-thumbs-up" aria-hidden="true"/> <span>.</span> {details.recipe.favoriteCount} <i className="fa fa-star" aria-hidden="true"/> </span>
          </div>

        <div className="row">
            <div className="col-sm-6">
                <p>
                {details.recipe.ingredient}
                </p>  
            </div>

            <div className="col-sm-6 float-right">
                <img src={noodles} className="img img-fluid" alt="Recipe image"/>
                <span className="text-muted form-text text-center"><em>Food is ready</em></span>
            </div>
        </div>

            <div className="mt-5">
                <h3>Directions</h3>
                <p>
                  {details.recipe.recipeDirection}
                </p>
            </div>

            <div className="mt-5 fav-link">
                <a href="#" onClick={ this.createFavorite.bind(this) } className="font-awesome-fav"><i className="fa fa-heart-o fa-lg"/> Favorite</a>
                &nbsp;
                <a href="#" onClick={ this.deleteRecipe.bind(this) } className="font-awesome-delete"><i className="fa fa-trash-o fa-lg"/> Delete</a>
            </div>

            <div className="mt-5">
                <h3>Was this recipe helpful?</h3>
                <a href="#" className="font-awesome-thumb"><i className="fa fa-thumbs-up fa-lg"/> Upvote </a>
                &nbsp;
                <a href="#" className="font-awesome-thumb">
                    <i className="fa fa-thumbs-down fa-lg"/> Downvote
                </a>
            </div>

            <div className="mt-5">
                <a href="#" className="primary-color">
                    <i className="fa fa-envelope fa-lg"/> <span>Receive email updates</span>
                </a>
            </div>

            <div className="mt-5">
                <h3 className="mb-4">Reviews</h3>
                <span className="text-muted"><em>John Doe said:</em></span>
                <p>This was an awesome recipe to try out...</p>
            </div>

            <div className="mt-5 mb-2">
                <h3>Drop a review</h3>
                <form>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="review-body"/>
                            <textarea className="form-control" placeholder="How awesome was this recipe?" name="review-body" id="review-body" cols="30" rows="10"/>
                            <div className="invalid-feedback">
                                Please add a review
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-primary-color" type="submit">Submit form</button>
                </form>

            </div>

        </div>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  getAllRecipes: PropTypes.func.isRequired
};

export default connect(null, { getAllRecipes })(RecipeDetails);

