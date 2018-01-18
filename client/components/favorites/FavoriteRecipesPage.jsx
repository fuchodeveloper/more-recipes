/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllFavorites from '../../action/favorites/getAllFavorites';
import AllFavoriteRecipes from './AllFavoriteRecipes';

/**
 * @description Parent component for favorite recipes class
 *
 * @class FavoriteRecipesPage
 *
 * @extends {React.Component}
 */
class FavoriteRecipesPage extends React.Component {
  /**
 * @description Creates an instance of FavoriteRecipesPage.
 *
 * @param {Object} props
 *
 * @memberof FavoriteRecipesPage
 */
  constructor(props) {
    super(props);
    this.state = {
      favorites: {}
    }; // Initialize the state
  }
  /**
 * @description get all favorite recipes for authenticated user using API endpoint
 *
 * @memberof FavoriteRecipesPage
 *
 * @returns {undefined} calls getAllFavoritesProps
 */
  componentDidMount() {
    const { id } = this.props.user;
    this.props.getAllFavoritesProps(id);
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
    const { favorites } = nextProps.favorites;
    this.setState({ favorites });
  }

  /**
 * @description render favorite recipes page template
 *
 *
 * @memberof FavoriteRecipesPage
 *
 * @returns  {undefined}
 */
  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    if (this.state.favorites.length > 0) {
      return (
        <div>

          <div className="container margin-top-70">

            <div>
              <h1 className="text-center p-4 center-hero-title">All Your Favorite Recipes In One Place</h1>
            </div>

            <div className="margin-top-50 margin-bottom-50" />

            <div className="row">
              {
                Object
                  .keys(this.state.favorites)
                  .map(key => <AllFavoriteRecipes key={key} details={this.state.favorites[key]} />)
              }

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
            <h1 className="text-center p-4 center-hero-title">All Your Favorite Recipes In One Place</h1>
          </div>

          <div className="margin-top-50 margin-bottom-50" />

          <div className="row">
            <h2><i className="recipe-title">No favorited recipes</i></h2>
          </div>

        </div>

        <div className="clearfix m-5" />

      </div>
    );
  }
}

FavoriteRecipesPage.defaultProps = {
  id: null,
  isFetching: false
};

FavoriteRecipesPage.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  getAllFavoritesProps: PropTypes.func.isRequired,
  favorites: PropTypes.objectOf(String).isRequired,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => ({
  favorites: state.favorites,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  getAllFavoritesProps: userId => dispatch(getAllFavorites(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipesPage);
