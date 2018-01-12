import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mostUpvotes from '../../action/most-upvotes/mostUpvotesAction';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import AllMostUpvotes from './AllMostUpvotes';

class MostUpvotesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recipes: '',
      errors: '',
      cloudinaryRecipeImage: ''
    }; // Initialize the state
  }

  componentDidMount() {
    this.props.sortedRecipesProps();
  }

  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    this.setState({ recipes });
  }

  render() {
    const { isFetching } = this.props;
    console.log(this.state.recipes);

    if (isFetching) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    if (this.state.recipes.length > 0) {
      return (
        <div>

          {/* Header component for navigation */}
          <Header />

          <div className="container margin-top-70">

            <div>
              <h1 className="text-center p-4 center-hero-title">Most Upvoted Recipes</h1>
            </div>

            <div className="margin-top-50 margin-bottom-50" />

            <div className="row">
              {
              Object
                .keys(this.state.recipes)
                .map(key => <AllMostUpvotes key={key} details={this.state.recipes[key]} />)
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
            <h1 className="text-center p-4 center-hero-title">Most Upvoted Recipes</h1>
          </div>

          <div className="margin-top-50 margin-bottom-50" />

          <div className="row">
            <h2><i className="recipe-title">No upvoted recipes</i></h2>
          </div>

        </div>

        <div className="clearfix m-5" />

        {/* Display footer  */}
        <Footer />

      </div>
    );
  }
}

// MostUpvotesPage.propTypes = {
//   mostUpvotes: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  recipes: state.recipes.recipes
});

const mapDispatchToProps = dispatch => ({
  sortedRecipesProps: () => dispatch(mostUpvotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(MostUpvotesPage);
