import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash/isEmpty';
import noodles from '../assets/img/noodles.jpg';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import AllRecipes from './recipes/AllRecipes';
import recipeSearch from '../action/recipes/recipeSearchAction';
import getAllRecipes from '../action/recipes/getAllRecipes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favoriteCount: 0,
      cloudinaryRecipeImage: '',
      searchQuery: '',
      recipes: {},
      pageCount: ''
    }; // Initialize the state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
  *
  *
  * @memberof Home
  */
  componentDidMount() {
    this.props.recipeProps(this.state.pageCount);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes,
      pageCount: nextProps.pageCount.pageCount
    });
  }

  onFocus() {
    this.context.router.history.push('/search');
  }

  onPageChange(current) {
    current.selected += 1;
    this.props.recipeProps(current.selected);
  }

  onChange(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.recipeSearch(this.state.searchQuery);
  }

  render() {
    const { isFetching } = this.state;

    if (isFetching) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }


    if (isEmpty(this.state.recipes)) {
      return (
        <div>

          {/* Header component for navigation */}
          <Header />

          {this.props.children}

          <div className="container margin-top-70">

            <h1
              className="text-center p-4 center-hero-title"
            >Awesome Recipes Just For You
            </h1>
            <div />
            <form onSubmit={this.onSubmit} >

              <div className="input-group mt-2 mb-2 p-1">

                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="Try: 'Jollof Rice' "
                  aria-describedby="basic-addon2"
                  name="searchQuery"
                  value={this.state.searchQuery}
                          // onChange={ this.onChange }
                  onFocus={this.onFocus}
                  required
                />

                <input type="submit" value="SEARCH" className="btn btn-primary input-group-addon" />
              </div>
            </form>
            <div className="margin-top-50 margin-bottom-50" />

            <div>
              <h3 className="popular-text">Most recent recipes</h3>
            </div>

            <div>
              <div className="text-center">
                <i className="recipe-title">No recipes available yet</i>

              </div>

            </div>

            <div className="clearfix mt-4" />

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

        {this.props.children}

        <div className="container margin-top-70">

          <h1
            className="text-center p-4 center-hero-title"
          >Awesome Recipes Just For You
          </h1>
          <div />
          <form onSubmit={this.onSubmit} >

            <div className="input-group mt-2 mb-2 p-1">

              <input
                type="text"
                className="form-control p-3"
                placeholder="Try: 'Jollof Rice' "
                aria-describedby="basic-addon2"
                name="searchQuery"
                value={this.state.searchQuery}
                        // onChange={ this.onChange }
                onFocus={this.onFocus}
                required
              />

              <input type="submit" value="SEARCH" className="btn btn-primary input-group-addon" />
            </div>
          </form>
          <div className="margin-top-50 margin-bottom-50" />

          <div>
            <h3 className="popular-text">Most popular recipes</h3>
          </div>

          <div>
            <div className="row">
              {
                  Object
                    .keys(this.state.recipes)
                    .map(key => <AllRecipes key={key} details={this.state.recipes[key]} />)
                  }

            </div>

          </div>

          <div className="clearfix mt-4" />

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


        <div className="clearfix m-5 mb-5" />

        {/* Display footer  */}
        <Footer />

      </div>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = ({
  recipes, isFetching, searchResult, pageCount
}) => ({
  recipes,
  isFetching,
  searchResult,
  pageCount
});

const mapDispatchToProps = dispatch => ({
  recipeProps: pageCount => dispatch(getAllRecipes(pageCount)),
  recipeSearch: searchContent => dispatch(recipeSearch(searchContent))
});

// Home.propTypes = {
//   recipeSearch: PropTypes.func.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
