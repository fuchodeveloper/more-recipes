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
      details: '',
      errors: '',
      cloudinaryRecipeImage: ''
    } // Initialize the state
  }

  componentWillMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
    this.props.mostUpvotes()
    .then((mostUpvotes) => {
      // console.log(mostUpvotes.data.recipes);
      this.setState({ details: mostUpvotes.data.recipes })
    })
    .catch((errors) => {
      console.log(errors.data.error);
      this.setState({ errors: errors.data.error })
    })
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
              <h1 className="text-center p-4 center-hero-title">Most Upvoted Recipes</h1>
          </div>

          <div className="margin-top-50 margin-bottom-50"/>

          <div className="row">
            {
              Object
                .keys(this.state.details)
                .map(key => <AllMostUpvotes key={key} details={this.state.details[key]} />)
            }
            
          </div>

        </div>

        <div className="clearfix m-5"/>

        {/* Display footer  */}
        <Footer />

      </div>
    )
  }
}

MostUpvotesPage.propTypes = {
  mostUpvotes: PropTypes.func.isRequired
}

export default connect(null, { mostUpvotes })(MostUpvotesPage);
