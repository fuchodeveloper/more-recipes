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
      isLoading: true,
      details: {},
      errors: {},
      favoriteCount: 0,
      cloudinaryRecipeImage: ''
    }; // Initialize the state
  }

  /**
   *  GET all favorite recipes for authenticated user using API endpoint
   */
  componentWillMount() {
    const userIdParam = this.props.match.params.id;

    setTimeout(() => this.setState({ isLoading: false }), 1000);
    this.props.getAllFavorites(userIdParam)
      .then((favorites) => {
      // console.log(favorites.data.isFound);
        this.setState({ details: favorites.data.isFound });
      })
      .catch((error) => {
      // console.log(error);
        this.setState({ errors: error.data });
      });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <h2 className="text-center">Loading...</h2>
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

          <div className="margin-top-50 margin-bottom-50"/>

          <div className="row">
            {
              Object
                .keys(this.state.details)
                .map(key => <AllFavoriteRecipes key={key} details={this.state.details[key]} />)
            }

          </div>

        </div>

        <div className="clearfix m-5"/>

        {/* Display footer  */}
        <Footer />
      </div>
    );
  }
}

FavoriteRecipesPage.propTypes = {
  getAllFavorites: PropTypes.func.isRequired
};

export default connect(null, { getAllFavorites })(FavoriteRecipesPage);
