import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createRecipe } from '../../action/recipes/recipeActions';

class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeImage: '',
      ingredient: '',
      recipeDirection: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState
    ({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createRecipe(this.state);
  }

  render() {
    const { recipeName, recipeDirection, ingredient } = this.state;
    return (
      <div>
          <form encType="multipart/form-data" onSubmit={this.onSubmit}>
              <input 
                type="file" 
                name="recipeImage" 
                id="recipe-image" 
                accept="image/*" 
                value={this.state.recipeImage}
                onChange={ this.onChange }
              />
              <h3 className="text-center p-4 center-hero-text">Add Ingredients</h3>

              <div className="form-row" id="recipe-quantity">
                <div className="col-sm-12">
                    <div>
                        <input
                          placeholder="Enter recipe name"
                          type="text" 
                          name="recipeName" 
                          id="recipeName" 
                          className="form-control"
                          value={this.state.recipeName}
                          onChange={ this.onChange }
                        />
                    </div>
                </div>
                <div className="m-1"/>

                <div className="col-sm-12">
                    <div>
                        <input
                          placeholder="Enter recipe ingredients"
                          type="text" 
                          name="ingredient" 
                          id="ingredient" 
                          className="form-control"
                          value={this.state.ingredient}
                          onChange={ this.onChange }
                        />
                    </div>
                </div>
              </div>

              <div className="clearfix"></div>
              <div className="form-row">
                  <div className="col-md-12 mb-3">
                      <label htmlFor="recipeDirection"></label>
                      <textarea 
                        className="form-control" 
                        placeholder="Give a detailed direction for this recipe:" 
                        name="recipeDirection" 
                        id="recipe-direction" 
                        cols="30" 
                        rows="10" 
                        value={ this.state.recipeDirection }
                        onChange={ this.onChange }
                      />
                  </div>
              </div>

              <div className="float-right p-1">
                  {/* <input type="submit" className="" value="Submit"/> */}
                  <button type="submit" className="btn btn-primary">Submit</button>
              </div>

            </form>
      </div>
    )
  }
}

AddRecipeForm.propTypes = {
  createRecipe: PropTypes.func.isRequired
}

export default connect(null, { createRecipe })(AddRecipeForm);
