import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import noodles from '../../assets/img/noodles.jpg';
import getRecipeDetails from '../../action/recipes/getRecipeDetails';
import { bindActionCreators } from 'redux';
import createFavorite from '../../action/favorites/createFavorite';
import upvoteRecipe from '../../action/recipes/upvoteAction';
import postRecipeReview from '../../action/reviews/postReviewAction';
import downvoteRecipe from '../../action/recipes/downvoteAction';
import RecipeReviews from './RecipeReviews';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favorite: '',
      recipeDelete: '',
      favoriteCount: 0,
      reviews: [],
      upVote: '',
      downVote: '',
      reviewUserName: '',
      recipeImage: ''
    }; // Initialize the state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createFavorite = this.createFavorite.bind(this);
    // this.deleteRecipe = this.deleteRecipe.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    const param = this.props.match.params.id;
  }


  componentWillMount() {
    const param = this.props.match.params.id;
    // const { param } = this.props;
    // this.props.dispatch(getRecipeDetails(param));
    this.props.recipeProps(param);
  }

  componentWillReceiveProps(nextProps) {
    const recipe = nextProps.recipe;
    const reviews = nextProps.recipe.Reviews;
    this.setState({ recipe, reviews });
  }

  createFavorite(e) {
    e.preventDefault();
    const param = this.props.match.params.id;

    this.props.favoriteProps(param);
  }

  // deleteRecipe(e) {
  //   e.preventDefault();
  //   const { param } = this.props;

  //   return axios.delete(`/api/v1/recipes/${param}`)
  //     .then((recipeDelete) => {
  //       this.setState({ favorited: recipeDelete.response.data.message })
  //     })
  //     .catch((error) => {
  //       alert(error.response.data.error);
  //       this.setState({ errors: error })
  //     })
  // }

  upVote(e) {
    e.preventDefault();

    this.props.receiveUpvote(this.props.match.params.id);
  }

  downVote(e) {
    e.preventDefault();

    this.props.receiveDownvote(this.props.match.params.id);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const param = this.props.match.params.id;
    const userReview = this.state;

    this.props.postReview(param, userReview);
    this.setState({ review: '' });
  }

  render() {
    const param = this.props.match.params.id;
    const { isFetching, recipe, reviews } = this.props;

    if (isFetching) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    return (
     <div>

      <Header />

      <div>
        <div className="overlay margin-top-50">
            <div className="jumbotron recipe-header-background" style={{ backgroundImage: `url(${recipe.recipeImage === '' ? noodles : recipe.recipeImage})` }}>
                <div className="container recipe-overlay-text">
                    <h1 className="display-3 recipe-title">Recipe: {recipe.recipeName}</h1>
                    <p className="recipe-author"><em>By: John Doe</em></p>
                </div>
            </div>
        </div>

        <div className="container">
          <div className="mb-4">
            <span className="recipe-title">Recipe Ingredients</span>
            <span className="float-right recipe-ratings-right text-muted">{recipe.views} <i className="fa fa-eye" aria-hidden="true"/> <span className="big-pipe">.</span> {recipe.upVotes} <i className="fa fa-thumbs-up" aria-hidden="true"/> <span>.</span> {recipe.favoriteCount} <i className="fa fa-star" aria-hidden="true"/> </span>
          </div>

        <div className="row">
            <div className="col-sm-6">
                <p>
                {recipe.ingredient}
                </p>
            </div>

            <div className="col-sm-6 float-right">
                <img src={recipe.recipeImage === '' ? noodles : recipe.recipeImage} className="img img-fluid" alt="Recipe image"/>
                <span className="text-muted form-text text-center"><em>Food is ready</em></span>
            </div>
        </div>

            <div className="mt-5">
                <h3>Directions</h3>
                <p>
                  {recipe.recipeDirection}
                </p>
            </div>

            <div className="mt-5 fav-link">
                <a href="#" onClick={ this.createFavorite } className="font-awesome-fav"><i className="fa fa-heart-o fa-lg"/> Favorite</a>
                &nbsp;
            </div>

            <div className="mt-5">
                <h3>Was this recipe helpful?</h3>
                <a href="#" onClick={ this.upVote } className="font-awesome-thumb">
                  <i className="fa fa-thumbs-up fa-lg"/>
                  {recipe.upVotes} &nbsp;
                </a>
                   &nbsp;
                <a href="#" onClick={ this.downVote } className="font-awesome-thumb">
                    <i className="fa fa-thumbs-down fa-lg"/> {recipe.downVotes}
                </a>
            </div>

            <div className="mt-5">
                <a href="#" className="primary-color">
                    <i className="fa fa-envelope fa-lg"/> <span>Receive email updates</span>
                </a>
            </div>

            <div className="mt-5">
                <h3 className="mb-4">Reviews</h3>


                { Object.keys(this.state.reviews).length > 0 ? <div>
                  {
                       Object
                       .keys(this.state.reviews)
                       .sort((a, b) => b - a)
                       .map(key => <RecipeReviews key={key} review={this.state.reviews[key]} />)
                  }
                  </div> : <i className="recipe-title">No reviews yet</i>
                }

            </div>

            <div className="mt-5 mb-2">
                <h3>Drop a review</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="review-body"/>
                            <textarea
                              className="form-control"
                              placeholder="How awesome was this recipe?"
                              name="review"
                              id="review-body"
                              cols="30"
                              rows="10"
                              required
                              value={ this.state.review }
                              onChange = { this.onChange }
                            />
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

        <div className="clearfix m-5"/>
          <Footer />
     </div>
    );
  }
}

RecipeDetails.propTypes = {
  recipeProps: PropTypes.func.isRequired,
  receiveUpvote: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  isFetching: state.isFetching,
  review: state.review,
  favorite: state.favorite
});

const mapDispatchToProps = dispatch => ({
  favoriteProps: param => dispatch(createFavorite(param)),
  recipeProps: param => dispatch(getRecipeDetails(param)),
  receiveUpvote: param => dispatch(upvoteRecipe(param)),
  receiveDownvote: param => dispatch(downvoteRecipe(param)),
  postReview: (param, userReview) => dispatch(postRecipeReview(param, userReview))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
