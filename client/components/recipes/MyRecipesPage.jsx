import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import alertify from 'alertify.js';
import ReactPaginate from 'react-paginate';
import { BounceLoader } from 'react-spinners';
import MyRecipesDetail from './MyRecipesDetail';
import myRecipesAction from '../../action/recipes/myRecipesActions';
import deleteRecipeAction from '../../action/recipes/deleteRecipeAction';

/**
 *
 *
 * @class MyRecipesPage
 *
 * @extends {React.Component}
 */
export class MyRecipesPage extends React.Component {
  /**
   * @description Creates an instance of MyRecipesPage.
   *
   * @param {Object} props
   *
   * @memberof MyRecipesPage
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: '',
      pageCount: ''
    }; // Initialize the state

    this.onPageChange = this.onPageChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }


  /**
   * @description GET all recipes for authenticated user using API endpoint
   *
   * @memberof MyRecipesPage
   *
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.myRecipesAction(this.state.pageCount);
  }
  /**
 * @description Component lifecycle method
 *
 * @param {Object} nextProps
 *
 * @memberof MyRecipesPage
 *
 * @returns {undefined}
 */
  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    const { pageCount } = nextProps;
    this.setState({ recipes, pageCount });
  }


  /**
 * function to handle page number change
 *
 * @param {Number} current
 *
 * @memberof MyRecipesPage
 *
 * @returns {undefined}
 */
  onPageChange(current) {
    current.selected += 1;
    this.props.myRecipesAction(current.selected);
  }

  /**
 * @description confirm recipe deletion
 *
 * @param {Object} event
 *
 * @memberof MyRecipesPage
 *
 * @returns {undefined}
 */
  onConfirm(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    alertify.confirm('Do you really want to delete this recipe', () => {
      // user clicked "ok"
      this.props.deleteRecipeAction(id);
    }, () => {
      // user clicked "cancel"
    });
  }

  /**
 * @description renders component to DOM
 *
 * @memberof MyRecipesPage
 *
 *  @returns {JSX} JSX representation of component
 */
  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <h2 className="text-center">
          <span className="mt-5 d-inline-block">
            <BounceLoader
              color="#FF7055"
              loading={isFetching}
            />
          </span>
        </h2>
      );
    }


    if (this.state.recipes.length > 0) {
      return (
        <div>

          <div className="container margin-top-70">

            <div>
              <h1 className="text-center p-4 center-hero-title">My Recipes</h1>
            </div>

            <div className="margin-top-50 margin-bottom-50" />

            <div className="row">
              {Object
              .keys(this.state.recipes)
              .map(key => (<MyRecipesDetail
                key={key}
                details={this.state.recipes[key]}
                onConfirm={this.onConfirm}
              />))
            }

            </div>

            <div className="row">
              <ReactPaginate
                pageCount={parseInt(this.state.pageCount, 10)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={3}
                previousLabel="Previous"
                nextLabel="Next"
                breakClassName="text-center"
                initialPage={0}
                containerClassName="container pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="page-item active"
                previousClassName="page-item"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                onPageChange={this.onPageChange}
              />
            </div>

          </div>

          <div className="clearfix m-5" />
        </div>
      );
    }

    return (
      <div>

        <div className="container margin-top-70">

          <div>
            <h1 className="text-center p-4 center-hero-title">My Recipes</h1>
          </div>

          <div className="margin-top-50 margin-bottom-50" />

          <div>
            <h2 className="text-center"><i className="recipe-title">
            You have not created any recipes
                                        </i>
            </h2>
            <div className="text-center">
              <Link to="/add" className="btn btn-primary btn-primary-color">
              Create a recipe
              </Link>
            </div>
          </div>
          <div className="clearfix mt-4" />

          <div className="clearfix m-5" />

        </div>
      </div>
    );
  }
}

MyRecipesPage.defaultProps = {
  recipes: {}
};

MyRecipesPage.propTypes = {
  myRecipesAction: PropTypes.func.isRequired,
  deleteRecipeAction: PropTypes.func.isRequired,
  recipes: PropTypes.shape({})
};

/**
 * @description function mapStateToProps
 *
 * @param {Object} state
 *
 * @returns {Object} recipes
 */
const mapStateToProps = state => ({
  recipes: state.recipesReducer.recipes,
  pageCount: state.recipesReducer.pageCount
});

/**
 * @description dispatch myRecipesActionProps
 *
 * @param {dispatch} dispatch
 *
 * @returns {dispatch} - dispatch myRecipesAction and deleteRecipeAction
 */
const mapDispatchToProps = dispatch => ({
  myRecipesAction: pageCount => dispatch(myRecipesAction(pageCount)),
  deleteRecipeAction: recipeId => dispatch(deleteRecipeAction(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);
