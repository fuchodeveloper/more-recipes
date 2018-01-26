import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Capitalize from 'lodash.capitalize';
import { BounceLoader } from 'react-spinners';
import placeholderImage from '../../assets/img/noodles.jpg';
import getRecipeAction from '../../action/recipes/getRecipeAction';
import createFavoritesAction
  from '../../action/favorites/createFavoritesAction';
import upvoteRecipe from '../../action/recipes/upvoteAction';
import postRecipeReview from '../../action/reviews/postReviewAction';
import downvoteRecipe from '../../action/recipes/downvoteAction';
import RecipeReviews from './RecipeReviews';

/**
 * @description class to handle recipe details
 *
 * @class RecipeDetails
 *
 * @extends {React.Component}
 */
class RecipeDetails extends React.Component {
  /**
   * @description Creates an instance of RecipeDetails.
   *
   * @param {Object} props
   *
   * @memberof RecipeDetails
   */
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      loading: true
    }; // Initialize the state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createFavorite = this.createFavorite.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  /**
 * @description lifecycle method to handle getting recipe details
 *
 * @memberof RecipeDetails
 *
 * @returns {undefined} calls getRecipe with the recipe id
 */
  componentWillMount() {
    this.props.getRecipeAction(this.props.match.params.id)
      .then(() => {
        this.setState({ loading: false });
      });
  }

  /**
 * @description handle input field change
 *
 * @param {Object} event
 *
 * @memberof RecipeDetail
 *
 * @returns {undefined} calls setState
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 * @description Function to handle form submission
 *
 * @param {Object} event
 *
 * @memberof RecipeDetails
 *
 * @returns {undefined} submits user details to action
 */
  onSubmit(event) {
    event.preventDefault();
    const param = this.props.match.params.id;
    const userReview = this.state;

    this.props.postReview(param, userReview);
    this.setState({ review: '' });
  }
  /**
 * @description Function to handle recipe upvote
 *
 * @param {Object} event
 *
 * @memberof RecipeDetails
 *
 * @returns {undefined} calls receiveUpvote
 */
  upVote(event) {
    event.preventDefault();
    this.props.receiveUpvote(this.props.match.params.id);
  }
  /**
 * @description Function to handle recipe downvote
 *
 * @param {Object} event
 *
 * @memberof RecipeDetails
 *
 * @returns {undefined} calls receiveDownvote with the id of the recipe
 */
  downVote(event) {
    event.preventDefault();
    this.props.receiveDownvote(this.props.match.params.id);
  }

  /**
 * @description function to favorite a recipe
 *
 * @param {Object} event
 *
 * @memberof RecipeDetails
 *
 * @returns {undefined}
 */
  createFavorite(event) {
    event.preventDefault();
    const recipeId = this.props.match.params.id;

    this.props.createFavoritesAction(recipeId);
  }
  /**
 * @description renders component to DOM
 *
 * @memberof RecipeDetails
 *
 *  @returns {JSX} JSX representation of component
 */
  render() {
    if (this.state.loading) {
      return (
        <h2 className="text-center mt-5">
          <span className="mt-5 d-inline-block">
            <BounceLoader
              color="#FF7055"
              loading={this.state.loading}
            />
          </span>
        </h2>
      );
    }
    const { recipe } = this.props;

    const ingredientsMap = recipe.ingredients.split(',').map((item, index) => (
      <li key={index}>{Capitalize(item)}</li>
    ));

    return (
      <div>

        <div>
          <div className="overlay margin-top-50">
            <div
              className="jumbotron recipe-header-background"
              style={{
              backgroundImage: `url(${recipe.image === ''
              ?
              placeholderImage : recipe.image})`
            }}
            >
              <div className="container recipe-overlay-text">
                <h1
                  className="display-2 recipe-title"
                  style={{ marginTop: '10em' }}
                >
                Recipe: {recipe.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="mb-4">
              <span className="recipe-title">Recipe Ingredients</span>
              <span className="float-right recipe-ratings-right text-muted">
                {recipe.views}&nbsp;
                <i className="fa fa-eye" aria-hidden="true" />
                <span className="big-pipe"> . </span>
                {recipe.upVotes}&nbsp;
                <i className="fa fa-thumbs-up" aria-hidden="true" />
                <span> .</span>
                &nbsp; {recipe.favoriteCount}
                <i className="fa fa-star" aria-hidden="true" />
              </span>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <ul className="p-4">
                  {
                    ingredientsMap
                  }
                </ul>
              </div>

              <div className="col-sm-6 float-right">
                <img
                  src={recipe.image === '' ?
                  placeholderImage : recipe.image}
                  className="img img-fluid"
                  alt={recipe.name}
                />
                <span className="text-muted form-text text-center">
                  <em>Food is ready</em>
                </span>
              </div>
            </div>

            <div className="mt-5">
              <h3>Directions</h3>
              <p>
                {recipe.direction}
              </p>
            </div>

            <div className="mt-5 fav-link">
              <a
                href="#"
                onClick={this.createFavorite}
                className="font-awesome-fav"
              >
                {
                  !this.props.favorited ?
                    <div style={{ display: 'inline' }}>
                      <i className="fa fa-heart-o fa-lg" /> Favorite
                    </div>
                    :
                    <div style={{ display: 'inline' }}>
                      &nbsp;
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-square-o fa-stack-2x" />
                        <i className="fa fa-heart-o fa-stack-1x" />
                      </span> Favorited
                    </div>
                }

              </a>
                &nbsp;
            </div>

            <div className="mt-5">
              <h3>Was this recipe helpful?</h3>
              <a href="#" onClick={this.upVote} className="font-awesome-thumb">
                <i className="fa fa-thumbs-up fa-lg" />
                {recipe.upVotes} &nbsp;
              </a>
                   &nbsp;
              <a
                href="#"
                onClick={this.downVote}
                className="font-awesome-thumb"
              >
                <i className="fa fa-thumbs-down fa-lg" />
                {recipe.downVotes}
              </a>
            </div>

            <div className="mt-5">
              <h3 className="mb-4">Reviews</h3>


              { Object.keys(this.props.reviews).length > 0 ?
                <div className="scroll col-md-8">
                  {
                    Object
                    .keys(this.props.reviews)
                    .sort((a, b) => b - a)
                    .map(key => (<RecipeReviews
                      key={key}
                      review={this.props.reviews[key]}
                    />))
                  }
                </div> : <i className="recipe-title">No reviews yet</i>
                }

            </div>

            <div className="mt-5 mb-2">
              <h3>Drop a review</h3>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="review-body" />
                    <textarea
                      className="form-control"
                      placeholder="How awesome was this recipe?"
                      name="review"
                      id="review-body"
                      cols="30"
                      rows="10"
                      required
                      value={this.state.review}
                      onChange={this.onChange}
                    />
                    <div className="invalid-feedback">
                      Please add a review
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-primary-color"
                  type="submit"
                >Add Review
                </button>
              </form>

            </div>

          </div>
        </div>

        <div className="clearfix m-5" />
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  getRecipeAction: PropTypes.func.isRequired,
  receiveUpvote: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  }).isRequired,
  recipe: PropTypes.shape({
    Reviews: PropTypes.shape({}).isRequired
  }).isRequired,
  receiveDownvote: PropTypes.func.isRequired,
  createFavoritesAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipesReducer.recipe,
  favorited: state.recipesReducer.favorited,
  isFetching: state.isFetching,
  reviews: state.recipesReducer.reviews,
  userid: state.auth.user.id,
});
const mapDispatchToProps = dispatch => ({
  createFavoritesAction: param => dispatch(createFavoritesAction(param)),
  getRecipeAction: recipeId => dispatch(getRecipeAction(recipeId)),
  receiveUpvote: recipeId => dispatch(upvoteRecipe(recipeId)),
  receiveDownvote: recipeId => dispatch(downvoteRecipe(recipeId)),
  postReview: (recipeId, userReview) =>
    dispatch(postRecipeReview(recipeId, userReview)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
