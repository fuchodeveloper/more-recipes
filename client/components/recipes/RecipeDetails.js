import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import noodles from '../../assets/img/noodles.jpg';
import getRecipeDetails from '../../action/recipes/getRecipeDetails';
// import { createFavorite } from '../../action/favorites/createFavorite';
// import upvoteRecipe from '../../action/recipes/upvoteAction';
// import downvoteRecipe from '../../action/recipes/downvoteAction';
// import RecipeReviews from './RecipeReviews';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favorited: '',
      recipeDelete: '',
      favoriteCount: 0,
      review: '',
      upVote: '',
      downVote: '',
      reviewUserName: '',
      recipeImage: ''
    }; // Initialize the state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    const { param } = this.props;
    this.props.dispatch(getRecipeDetails(param));
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
        this.setState({ favorited: recipeDelete.response.data.message })
      })
      .catch((error) => {
        alert(error.response.data.error);
        this.setState({ errors: error })
      })
  }

  upVote(e) {
    e.preventDefault();
    const { param } = this.props;

    this.props.upvoteRecipe(param)
    .then((recipeUpvoteSuccess) => {
      alert(recipeUpvoteSuccess.response.data.message);
      this.setState({ upVote: recipeUpvoteSuccess.response.data.message })
    })
    .catch((recipeUpvoteError) => {
      alert(recipeUpvoteError.response.data.error);
      this.setState({ errors: recipeUpvoteError.response.data.error })
    })
  }

  downVote(e) {
    e.preventDefault();
    const { param } = this.props;

    this.props.downvoteRecipe(param)
    .then((recipeDownvoteSuccess) => {
      alert(recipeDownvoteSuccess.response.data.message);
      this.setState({ downVote: recipeDownvoteSuccess.response.data.message })
    })
    .catch((recipeDownvoteError) => {
      alert(recipeDownvoteError.response.data.error);
      this.setState({ errors: recipeDownvoteError.response.data.error })
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { param } = this.props;

    return axios.post(`/api/v1/recipes/${param}/reviews`, this.state)
    .then((review) => {
      alert('Review Added.')
      this.refs.review.value = '';
      this.setState({ review: review })
    }
  )
    .catch((error) => {
      alert(error.response.data.error);
      this.setState({ errors: error.response.data.error })
    })

  }
  
  render() {
    const { isFetching, recipe} = this.props;

    if (isFetching) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    
    return (
   
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
                <a href="#" onClick={ this.createFavorite.bind(this) } className="font-awesome-fav"><i className="fa fa-heart-o fa-lg"/> Favorite</a>
                &nbsp;
                <a href="#" onClick={ this.deleteRecipe.bind(this) } className="font-awesome-delete"><i className="fa fa-trash-o fa-lg"/> Delete</a>
            </div>

            <div className="mt-5">
                <h3>Was this recipe helpful?</h3>
                <a href="#" onClick={ this.upVote.bind(this) } className="font-awesome-thumb"><i className="fa fa-thumbs-up fa-lg"/> Upvote </a>
                &nbsp;
                <a href="#" onClick={ this.downVote.bind(this) } className="font-awesome-thumb">
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
                
                {
                  Object
                    .keys(this.state.review)
                    .map(key => <RecipeReviews key={key} details={this.state.review[key]}/>)
                }
                
            </div>

            <div className="mt-5 mb-2">
                <h3>Drop a review</h3>
                <form onSubmit={ this.onSubmit  }>
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
                              /* value={ this.state.review } */
                              onChange = { this.onChange }
                              ref="review"
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
    );
  }
}

// RecipeDetails.propTypes = {
//   getAllRecipes: PropTypes.func.isRequired
// };

// RecipeDetails.propTypes = {
//   upvoteRecipe: PropTypes.func.isRequired,
//   downvoteRecipe: PropTypes.func.isRequired
// }

const mapStateToProps = ({recipe, isFetching}) => ({
  recipe,
  isFetching
});

// const mapDispatchToProps = dispatch => {
//   console.log(dispatch)
//   return {
//     upvoteRecipe,
//     downVote
//   }
// }

export default connect(mapStateToProps)(RecipeDetails);
// export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);

