import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import getAllFavorites from '../../action/favorites/getAllFavorites';

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
      console.log(favorites.data.isFound);
      // this.setState({ details: recipe.data })
    })
    .catch((error) => {
      console.log(error);
      // this.setState({ errors: error.response })
    })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

FavoriteRecipesPage.propTypes = {
  getAllFavorites: PropTypes.func.isRequired
}

export default connect(null, { getAllFavorites })(FavoriteRecipesPage);
