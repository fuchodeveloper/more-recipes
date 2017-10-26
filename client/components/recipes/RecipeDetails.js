import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noodles from '../../assets/img/noodles.jpg';
import { getAllRecipes } from '../../action/recipes/recipeDetails';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
      recipeName: '',
      recipeDirection: ''
    }
  }


  render() {
    
    return (
      <div>
        <div className="overlay margin-top-50">
            <div className="jumbotron recipe-header-background">
                <div className="container recipe-overlay-text">
                    <h1 className="display-3 recipe-title">Recipe: Party Jollof</h1>
                    <p className="recipe-author"><em>By: John Doe</em></p>
                </div>
            </div>
        </div>

        <div className="container">
          <div className="mb-4">
            <span className="recipe-title">Recipe and Ingredients</span>
            <span className="float-right recipe-ratings-right text-muted">30 <i className="fa fa-eye" aria-hidden="true"/> <span className="big-pipe">.</span> 42 <i className="fa fa-thumbs-up" aria-hidden="true"/> <span>.</span> 30 <i className="fa fa-star" aria-hidden="true"/> </span>
          </div>

        <div className="row">
            <div className="col-sm-6">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>3</td>
                        <td>cigar cups | 750g long grain parboiled rice</td>
                    </tr>
                    <tr>
                        <td>500 mls</td>
                        <td>Tomato stew</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Whole chicken</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Medium bulb onions</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="col-sm-6 float-right">
                <img src={noodles} className="img img-fluid" alt="Recipe image"/>
                <span className="text-muted form-text text-center"><em>Food is ready</em></span>
            </div>
        </div>

            <div className="mt-5">
                <h3>Directions</h3>
                <p>

                    Pour the chicken stock and the tomato stew into a sizeable pot and leave to boil.
                    Add the drained parboiled rice, curry powder, salt and pepper to taste. The water level should be the same level of the rice. This is to ensure that all the water dries up by the time the rice is cooked.
                    Cover the pot and leave to cook on low to medium heat. This way the rice does not burn before the water dries up.

                    If you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. Taste to confirm. If not, you will need to add more water and reduce the heat to prevent burning. Keep cooking till done.

                    Serve with Fried Plantain, Nigerian Moi Moi, Nigerian Salad or Coleslaw.

                    You can spice up this recipe by adding 2 well known vegetables to arrive at what we refer to as Mixed Vegetables Jollof Rice.
                </p>
            </div>

            <div className="mt-5 fav-link">
                <a href="#" className="font-awesome-fav"><i className="fa fa-heart-o fa-lg"/> Favorite</a>
                &nbsp;
                <a href="#" className="font-awesome-delete"><i className="fa fa-trash-o fa-lg"/> Delete</a>
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
                            <label htmlFor="review-body"></label>
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
}

export default connect(null, { getAllRecipes })(RecipeDetails);

