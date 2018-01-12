import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { createRecipe } from '../../action/recipes/recipeActions';
import placeholderImage from '../../assets/img/no-image.svg';

/**
 *
 *
 * @class AddRecipeForm
 * @extends {React.Component}
 */
class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeImage: '',
      ingredient: '',
      recipeDirection: '',
      isLoading: 0,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createRecipe(this.state)
      .then(() => {
        alert('Recipe Added.');
        this.context.router.history.push('/');
      })
      .catch((error) => {
        alert(error.response.data.error);
        this.setState({ errors: error.response.data.error, isLoading: 0 });
      });
  }

  uploadWidget(e) {
    e.preventDefault();
    const _this = this;

    cloudinary.openUploadWidget(
      { cloud_name: 'fuchodeveloper', upload_preset: 'wvxnziq0', tags: ['recipe'] },
      (error, result) => {
        _this.setState({ recipeImage: result[0].url });
      }
    );
  }

  render() {
    return (
      <div>
        {/* Recipe avatar */}
        <div className="col-md-6 mx-auto p-3 add_recipe-card text-center">

          <img src={this.state.recipeImage === '' ? placeholderImage : this.state.recipeImage} width="350px" id="recipe-image-avatar" height="auto" className="img-fluid" alt="" />
        </div>

        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
          <br />
          <div className="upload text-center">
            <button name="recipeImage" id="recipeImage" onClick={this.uploadWidget.bind(this)} className="upload-button btn-primary-color text-white">
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
                  value={this.state.recipeName}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="m-1" />

            <div className="col-sm-12">
              <div>
                <input
                  placeholder="Enter recipe ingredients"
                  type="text"
                  name="ingredient"
                  id="ingredient"
                  className="form-control"
                  value={this.state.ingredient}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="clearfix" />
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label htmlFor="recipeDirection" />
              <textarea
                className="form-control"
                placeholder="Give a detailed direction for this recipe:"
                name="recipeDirection"
                id="recipe-direction"
                cols="30"
                rows="10"
                value={this.state.recipeDirection}
                onChange={this.onChange}
                required
              />
            </div>
          </div>

          <div className="float-right p-1">
            <button type="submit" className="btn btn-primary btn-primary-color">Submit</button>
          </div>

        </form>
      </div>
    );
  }
}

AddRecipeForm.propTypes = {
  createRecipe: PropTypes.func.isRequired
};

AddRecipeForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { createRecipe })(AddRecipeForm);
