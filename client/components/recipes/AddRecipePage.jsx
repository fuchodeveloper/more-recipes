/* eslint-disable no-undef, max-len */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import addRecipeAction from '../../action/recipes/addRecipeAction';
import { placeholderImage } from '../../assets/img/helperImage';
import validateRecipe from '../../validations/validateRecipe';

/**
 * @description container to add a new recipe
 *
 * @class AddRecipePage
 *
 * @extends {React.Component}
 */
export class AddRecipePage extends React.Component {
  /**
   * @description Creates an instance of AddRecipePage.
   *
   * @param {Object} props constructor props
   *
   * @memberof AddRecipePage
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: placeholderImage,
      ingredients: '',
      direction: '',
      errors: {
        name: '',
        ingredients: '',
        direction: '',
        image: ''
      },
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }
  /**
 * @description component lifecycle method
 *
 * @param {Object} nextProps componentWillReceiveProps nextProps object
 *
 * @memberof AddRecipePage
 *
 * @returns {undefined} sets state of errors
 */
  componentWillReceiveProps(nextProps) {
    const { name, ingredients, direction } =
    (nextProps.errors.serverError) ? nextProps.errors.serverError : {};
    this.setState({
      errors: {
        name, ingredients, direction
      }
    });
  }

  /**
 * @description Function to handle change event
 *
 * @param {Object} event onChange event object
 *
 * @memberof AddRecipePage
 *
 * @returns {undefined} sets state on change
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description function to handle form submission
 *
 * @param {Object} event onSubmit event object
 *
 * @memberof AddRecipePage
 *
 * @returns {undefined} calls addRecipeAction on submit
 */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.addRecipeAction(this.state)
        .then(() => {
          this.setState({ redirect: true });
        });
    }
  }

  /**
   * @description Handle form validation
   *
   * @returns {Object} isValid returns boolean
   *
   * @memberof AddRecipePage
   */
  isValid() {
    const { errors, isValid } = validateRecipe(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
 * @description function to handle image uploads
 *
 * @param {Object} event image event object
 *
 * @memberof AddRecipePage
 *
 * @returns {undefined} new image upload
 */
  uploadWidget(event) {
    event.preventDefault();
    const scope = this;

    cloudinary.openUploadWidget(
      {
        cloud_name: 'fuchodeveloper',
        upload_preset: 'wvxnziq0',
        tags: ['recipe']
      },
      (error, result) => {
        if (!error) {
          scope.setState({ image: result[0].secure_url });
        }
      }
    );
  }

  /**
 * @description renders component to DOM
 *
 * @memberof AddRecipePage
 *
 *  @returns {JSX} JSX representation of component
 */
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="container margin-top-70">
          <div>
            <h1 className="text-center p-4 center-hero-text">Add Recipe</h1>
          </div>


          {/* Form to add recipe ingredients and quantity */}
          <div className="col-md-6 mx-auto p-3">
            {/* Recipe avatar */}
            <div className="col-md-6 mx-auto p-3 add_recipe-card text-center">

              <img
                src={this.state.image === ''
                ? placeholderImage : this.state.image}
                width="350px"
                id="recipe-image-avatar"
                height="auto"
                className="img-fluid"
                alt={this.state.name}
              />
            </div>

            <form
              encType="multipart/form-data"
              onSubmit={this.onSubmit}
              id="add-recipe-form"
            >
              <br />
              <div className="upload text-center">
                <button
                  name="image"
                  id="image-button"
                  onClick={this.uploadWidget}
                  className="upload-button btn-primary-color text-white"
                >
                      Add Image
                </button>
              </div>

              <h3 className="text-center p-4 center-hero-text">
              Add Ingredients
              </h3>

              <div className="form-row" id="recipe-quantity">
                <div className="col-sm-12">
                  <div>
                    <p className="text-muted">Recipe Name</p>
                    <input
                      placeholder="Enter recipe name"
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChange}
                      required
                    />

                    { this.state.errors.name &&
                      <div className="text-danger">
                        {this.state.errors.name}
                      </div>
                    }

                  </div>
                </div>
                <div className="m-1" />

                <div className="col-sm-12">
                  <div>
                    <br />
                    <p className="text-muted">Recipe Ingredients</p>
                    <textarea
                      placeholder="e.g Maggi, Knorr, pepper"
                      cols="30"
                      rows="5"
                      name="ingredients"
                      id="ingredients"
                      className="form-control"
                      value={this.state.ingredients}
                      onChange={this.onChange}
                      required
                    />
                    { this.state.errors.ingredients &&
                      <div className="text-danger">
                        {this.state.errors.ingredients}
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="clearfix" />
              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="direction" />
                  <p className="text-muted">Recipe Direction</p>
                  <textarea
                    className="form-control"
                    placeholder="Give a detailed direction for this recipe:"
                    name="direction"
                    id="recipe-direction"
                    cols="30"
                    rows="10"
                    value={this.state.direction}
                    onChange={this.onChange}
                    required
                  />
                  { this.state.errors.direction &&
                  <div className="text-danger">
                    {this.state.errors.direction}
                  </div>
                    }
                </div>
              </div>

              <div className="float-right p-1">
                <button
                  type="submit"
                  className="btn btn-primary btn-primary-color"
                  id="recipe-submit"
                >Submit
                </button>
              </div>

            </form>
          </div>
        </div>

        <div className="clearfix m-5" />
      </div>
    );
  }
}

AddRecipePage.propTypes = {
  addRecipeAction: PropTypes.func.isRequired
};

AddRecipePage.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.recipesReducer
});

const mapDispatchToProps = dispatch => ({
  addRecipeAction: recipe => dispatch(addRecipeAction(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipePage);
