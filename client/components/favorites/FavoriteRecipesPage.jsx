import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import getAllFavorites from '../../action/favorites/getAllFavorites';
import AllFavoriteRecipes from './AllFavoriteRecipes';

class FavoriteRecipesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      errors: {},
      favoriteCount: 0,
      cloudinaryRecipeImage: '',
      favorites: []
    }; // Initialize the state
  }

  /**
   *  GET all favorite recipes for authenticated user using API endpoint
   */
  componentDidMount() {
    // debugger;
    const { id } = this.props.user;
    this.props.getAllFavoritesProps(id);
  }

  componentWillReceiveProps(nextProps) {
    const { favorites } = nextProps.favorites;
    // const reviews = nextProps.recipe.Reviews;
    this.setState({ favorites });
  }

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
          {/* Header component for navigation */}
          <Header />

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

          {/* Display footer  */}
          <Footer />
        </div>
      );
    }

    return (
      <div>
        {/* Header component for navigation */}
        <Header />

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

        {/* Display footer  */}
        <Footer />
      </div>
    );
  }
}

// FavoriteRecipesPage.propTypes = {
//   getAllFavorites: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  favorites: state.favorites,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  getAllFavoritesProps: userId => dispatch(getAllFavorites(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipesPage);
