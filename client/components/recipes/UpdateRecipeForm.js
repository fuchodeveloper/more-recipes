import React from 'react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import updateRecipe from '../../action/recipes/updateRecipeAction';

class UpdateRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeImage: '',
      ingredient: '',
      recipeDirection: '',
      isLoading: true,
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  componentDidMount() {
    const { param } = this.props;

    setTimeout(() => this.setState({ isLoading: false }), 1000);
    axios.get('/api/v1/recipes/' + param)
        .then((recipes) => {
      return this.setState({ 
        recipeName: recipes.data.recipe.recipeName,
        recipeImage: recipes.data.recipe.recipeImage,
        recipeDirection: recipes.data.recipe.recipeDirection,
        ingredient: recipes.data.recipe.ingredient,
       })
    })
    .catch((error) => {
      this.setState({ errors: error.data })
    })
  }
  
  /**
   * Handle change events
   * @param {e} e 
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    /**
     * Id of the recipe to be updated sent as param
     */
    const { param } = this.props;

    this.props.updateRecipe(this.state, param)
    .then(() => {
      alert('Recipe Updated.')
      this.context.router.history.push(`/recipes/${param}`);   
    }
  )
    .catch(error => {
      this.setState({ errors: error.response.data, isLoading: false })
    })

  }

  uploadWidget(e) {
    e.preventDefault();
    let _this = this;

    cloudinary.openUploadWidget({ cloud_name: 'fuchodeveloper', upload_preset: 'wvxnziq0', tags:['recipe']},
      function(error, result) {
        _this.setState({ recipeImage: result[0].url})
    });

  }

  render() {
    const { recipeImage, recipeName, recipeDirection, ingredient, isLoading } = this.state;

    if (isLoading) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    
    return (
      <div>
         {/* Recipe avatar */}
         <div className="col-md-6 mx-auto p-3 add_recipe-card text-center">
              <img src={ recipeImage } width="350px" id="recipe-image-avatar" height="auto" className="img-fluid" alt={recipeName}/>
          </div>

          <form encType="multipart/form-data" onSubmit={this.onSubmit}> 
              <br />
              <div className="upload">
                  <button name="recipeImage" id="recipeImage" onClick={this.uploadWidget.bind(this)} className="upload-button">
                      Add Image
                  </button>
              </div>

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
                          value={recipeName} 
                          /* value={details.recipe.recipeName}  */
                          onChange={ this.onChange }
                          required
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
                          value={ingredient}
                          onChange={ this.onChange }
                          required
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
                        value={ recipeDirection }
                        onChange={ this.onChange }
                        required
                      />
                  </div>
              </div>

              <div className="float-right p-1">
                  <input type="submit" className="btn btn-primary btn-primary-color" value="Submit"/>
                  {/* <button type="submit" className="btn btn-primary btn-primary-color">Submit</button>  */}
              </div>

          </form>

      </div>
    );
  }
}

UpdateRecipeForm.propTypes = {
  updateRecipe: PropTypes.func.isRequired
}

UpdateRecipeForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { updateRecipe })(UpdateRecipeForm);
