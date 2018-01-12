import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import MyRecipesDetail from './MyRecipesDetail';
import myRecipesAction from '../../action/recipes/myRecipesActions';

/**
 *
 *
 * @class MyRecipesPage
 * @extends {React.Component}
 */
class MyRecipesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favoriteCount: 0,
      cloudinaryRecipeImage: '',
      recipes: ''
    }; // Initialize the state
  }


  /**
   *  GET all recipes for authenticated user using API endpoint
   */
  componentDidMount() {
    this.props.myRecipesActionProps();
  }

  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    this.setState({ recipes });
  }

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
          {/* Display page Header */}
          <Header />

          <div className="container margin-top-70">

            <div>
              <h1 className="text-center p-4 center-hero-title">My Recipes</h1>
            </div>

            <div className="margin-top-50 margin-bottom-50" />

            <div className="row">
              {Object
              .keys(this.state.recipes)
              .map(key => <MyRecipesDetail key={key} details={this.state.recipes[key]} />)
            }

            </div>

            {/* Bottom Navigation */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>


          </div>

          <div className="clearfix m-5" />

          {/* Display footer */}
          <Footer />
        </div>
      );
    }

    return (
      <div>
        {/* Display page Header */}
        <Header />

        <div className="container margin-top-70">

          <div>
            <h1 className="text-center p-4 center-hero-title">My Recipes</h1>
          </div>

          <div className="margin-top-50 margin-bottom-50" />

          <div className="">
            <h2 className="text-center"><i className="recipe-title">You have not created any recipes</i></h2>
            <div className="text-center">
              <Link to="/add" className="btn btn-primary btn-primary-color">Create a recipe</Link>
            </div>
          </div>

          <div className="clearfix m-5" />

          {/* Display footer */}
          <Footer />

        </div>
      </div>
    );
  }
}

/**
 * function mapStateToProps
 *
 * @param {object} state
 * @returns {object} recipes
 */
const mapStateToProps = state => ({
  recipes: state.recipes.recipes
});

const mapDispatchToProps = dispatch => ({
  myRecipesActionProps: () => dispatch(myRecipesAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);
