/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import getAllFavoritesAction from '../../action/favorites/getAllFavoritesAction';
import AllFavoriteRecipes from './AllFavoriteRecipes';

/**
 * @description Parent component for favorite recipes class
 *
 * @class FavoriteRecipesPage
 *
 * @extends {React.Component}
 */
export class FavoriteRecipesPage extends React.Component {
  /**
 * @description Creates an instance of FavoriteRecipesPage.
 *
 * @param {Object} props constructor props object
 *
 * @memberof FavoriteRecipesPage
 */
  constructor(props) {
    super(props);
    this.state = {
      recipes: '',
      pageCount: ''
    }; // Initialize the state
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 * @description get all favorite recipes for authenticated user
 *
 * @memberof FavoriteRecipesPage
 *
 * @returns {undefined} calls getAllFavoritesProps
 */
  componentDidMount() {
    const { id } = this.props.user;
    this.props.getAllFavoritesAction(id, this.state.pageCount);
  }

  /**
 * @description Update state with received props
 *
 * @param {Object} nextProps
 *
 * @memberof FavoriteRecipesPage
 *
 * @returns {undefined} calls setState
 */
  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    const { pageCount } = nextProps;
    this.setState({ recipes, pageCount });
  }


  /**
 * function to handle page number change
 *
 * @param {Number} current the current page number
 *
 * @memberof FavoriteRecipesPage
 *
 * @returns {undefined} updated currently selected page
 */
  onPageChange(current) {
    current.selected += 1;
    this.props.getAllFavoritesAction(current.selected);
  }

  /**
 * @description render favorite recipes page template
 *
 *
 * @memberof FavoriteRecipesPage
 *
 * @returns  {undefined} renders JSX
 */
  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    if (this.state.recipes.length > 0) {
      return (
        <div>

          <div className="container margin-top-70">

            <div>
              <h1 className="text-center p-4 center-hero-title">
              All Your Favorite Recipes In One Place
              </h1>
            </div>

            <div className="margin-top-50 margin-bottom-50" />

            <div className="row">
              {
                Object
                  .keys(this.state.recipes)
                  .map(key => (<AllFavoriteRecipes
                    key={key}
                    details={this.state.recipes[key]}
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
            <h1 className="text-center p-4 center-hero-title">
            All Your Favorite Recipes In One Place
            </h1>
          </div>

          <div className="margin-top-50 margin-bottom-50" />

          <div>
            <h2 className="text-center">
              <i className="recipe-title">No favorited recipes</i>
            </h2>
          </div>

        </div>

        <div className="clearfix m-5" />

      </div>
    );
  }
}

FavoriteRecipesPage.defaultProps = {
  id: null,
  isFetching: false,
  recipes: {}
};

FavoriteRecipesPage.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  getAllFavoritesAction: PropTypes.func.isRequired,
  recipes: PropTypes.shape({}),
  isFetching: PropTypes.bool
};

const mapStateToProps = state => ({
  recipes: state.recipesReducer.recipes,
  pageCount: state.recipesReducer.pageCount,
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  getAllFavoritesAction: (userId, pageCount) =>
    dispatch(getAllFavoritesAction(userId, pageCount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteRecipesPage);
