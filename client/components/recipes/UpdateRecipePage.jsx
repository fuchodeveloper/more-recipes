/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import getRecipeAction from '../../action/recipes/getRecipeAction';
import updateRecipeAction from '../../action/recipes/updateRecipeAction';
import validateRecipe from '../../validations/validateRecipe';

/**
 * @description component to handle recipe update
 *
 * @class UpdateRecipePage
 *
 * @extends {React.Component}
 */
export class UpdateRecipePage extends React.Component {
  /**
   * @description Creates an instance of UpdateRecipePage.
   *
   * @param {Object} props constructor props object
   *
   * @memberof UpdateRecipePage
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
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
 * @description component lifecycle method called on component mount
 *
 * @memberof UpdateRecipePage
 *
 * @returns {undefined} calls getRecipe
 */
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getRecipe(id);
  }

  /**
 * @description component lifecycle method
 *
 * @param {Object} nextProps
 *
 * @memberof UpdateRecipePage
 *
 * @returns {undefined} sets state of name, image, ingredients and direction
 */
  componentWillReceiveProps(nextProps) {
    const {
      name, image, ingredients, direction
    } = nextProps.recipe.recipe;
    this.setState({
      name, image, ingredients, direction
    });
  }

  /**
   * @description Handle change events
   *
   * @param {event} event onChange event props
   *
   * @returns {undefined} sets state on change
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description function to handle form submission
 *
 * @param {Object} event onSubmti props object
 *
 * @memberof UpdateRecipePage
 *
 * @returns {undefined} calls updateRecipe
 */
  onSubmit(event) {
    event.preventDefault();

    /**
     * @description Id of the recipe to be updated sent as param
     */
    const { id } = this.props.match.params;

    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.updateRecipe(id, this.state)
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
   * @memberof UpdateRecipePage
   */
  isValid() {
    const { errors, isValid } = validateRecipe(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
 * @description widget function to handle image upload
 *
 * @param {Object} event uploadWidget event object parameter
 *
 * @memberof UpdateRecipePage
 *
 * @returns {undefined} sets state of image
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
 * @memberof UPdateRecipePage
 *
 *  @returns {JSX} JSX representation of component
 */
  render() {
    if (this.state.redirect) {
      const { id } = this.props.match.params;
      return <Redirect to={`/recipes/${id}`} />;
    }

    const {
      name, image, direction, ingredients, isLoading
    } = this.props.recipe;

    if (isLoading) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    return (
      <div>

        <div className="container margin-top-70">
          <div>
            <h1 className="text-center p-4 center-hero-text">
            Update Recipe
            </h1>
          </div>

          <div className="col-md-6 mx-auto p-3">
            {/* Recipe avatar */}
            <div className="col-md-6 mx-auto p-3 add_recipe-card text-center">
              <img
                src={this.state.image}
                width="350px"
                id="image"
                height="auto"
                className="img-fluid"
                alt={this.state.name}
              />
            </div>

            <form
              encType="multipart/form-data"
              onSubmit={this.onSubmit}
              id="update-recipe-forms"
            >
              <br />
              <div className="upload text-center">
                <button
                  name="image"
                  id="image-button"
                  onClick={this.uploadWidget}
                  className="upload-button btn-primary btn-primary-color"
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
                      placeholder="Enter recipe ingredients"
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
                    id="direction"
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
                <input
                  type="submit"
                  id="submit"
                  className="btn btn-primary btn-primary-color"
                  value="Submit"
                />

              </div>

            </form>
          </div>
        </div>
        <div className="clearfix m-5" />

      </div>

    );
  }
}

UpdateRecipePage.defaultProps = {
  getRecipe: () => {},
  updateRecipe: () => {}
};

UpdateRecipePage.propTypes = {
  getRecipe: PropTypes.func,
  updateRecipe: PropTypes.func
};

const mapStateToProps = state => ({
  recipe: state.recipesReducer
});
const mapDispatchToProps = dispatch => ({
  updateRecipe: (recipeId, recipe) =>
    dispatch(updateRecipeAction(recipeId, recipe)),
  getRecipe: recipeId => dispatch(getRecipeAction(recipeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipePage);
