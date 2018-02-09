import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash/isEmpty';
import AllRecipes from './recipes/AllRecipes';
import recipeSearch from '../action/recipes/recipeSearchAction';
import getAllRecipesAction from '../action/recipes/getAllRecipesAction';

/**
 * @description class to display all recipes
 *
 * @class Home
 *
 * @extends {Component}
 */
export class Home extends Component {
  /**
   * @description Creates an instance of Home.
   *
   * @param {Object} props
   *
   * @memberof Home
   */
  constructor(props) {
    super(props);
    this.state = {
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
   * @description lifecycle method to show all recipes
   *
   * @memberof Home
   *
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.recipesAction(this.state.pageCount);
  }

  /**
 * @description lifecycle method used to update state
 *
 * @param {Object} nextProps
 *
 * @memberof Home
 *
 * @returns {undefined}
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes,
      pageCount: nextProps.pageCount
    });
  }

  /**
 * @description function to handle focus on search
 *
 * @memberof Home
 * @returns {undefined}
 */
  onFocus() {
    this.context.router.history.push('/search');
  }

  /**
 * function to handle page number change
 *
 * @param {Number} current
 *
 * @memberof Home
 *
 * @returns {undefined}
 */
  onPageChange(current) {
    current.selected += 1;
    this.props.recipesAction(current.selected);
  }

  /**
 *
 *
 * @param {Object} event
 *
 * @memberof Home
 *
 * @return {undefined}
 */
  onChange(event) {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description handle form submit
 *
 * @param {Object} event
 *
 * @memberof Home
 *
 * @returns {undefined}
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.recipeSearch(this.state.searchQuery);
  }

  /**
 * @description Render the JSX template
 *
 * @memberof Home
 *
 * @returns  {JSX} JSX representation of component
 */
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

          {this.props.children}

          <div className="container margin-top-70">

            <h1
              id="hero-title"
              className="text-center p-4 center-hero-title"
            >Awesome Recipes Just For You
            </h1>
            <div />
            <form onSubmit={this.onSubmit} >

              <div className="input-group mt-2 mb-2 p-1">

                <input
                  id="searchQuery"
                  type="text"
                  className="form-control p-3"
                  placeholder="Try: 'Jollof Rice' "
                  aria-describedby="searchQuery"
                  name="searchQuery"
                  value={this.state.searchQuery}
                  onFocus={this.onFocus}
                  required
                />

                <input
                  type="submit"
                  value="SEARCH"
                  className="btn btn-primary input-group-addon"
                />
              </div>
            </form>
            <div className="margin-top-50 margin-bottom-50" />

            <div>
              <h3
                className="popular-text"
                id="recent"
              >Most recent recipes
              </h3>
            </div>

            <div>
              <div className="text-center">
                <i className="recipe-title">No recipes available yet</i>

              </div>

            </div>

            <div className="clearfix mt-4" />

          </div>


          <div className="clearfix m-5" />


        </div>
      );
    }

    return (
      <div>
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
                id="searchQuery"
                type="text"
                className="form-control p-3"
                placeholder="Try: 'Jollof Rice' "
                aria-describedby="basic-addon2"
                name="searchQuery"
                value={this.state.searchQuery}
                onFocus={this.onFocus}
                required
              />

              <input
                type="submit"
                value="SEARCH"
                className="btn btn-primary input-group-addon"
              />
            </div>
          </form>
          <div className="margin-top-50 margin-bottom-50" />

          <div>
            <h3 className="popular-text">Most recent recipes</h3>
          </div>

          <div>
            <div className="row">
              {
                Object
                  .keys(this.state.recipes)
                  .map(key => (<AllRecipes
                    key={key}
                    details={this.state.recipes[key]}
                  />))
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
      </div>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  recipes: state.recipesReducer.recipes,
  isFetching: state.isFetching,
  searchResult: state.searchResult,
  pageCount: state.recipesReducer.pageCount
});

const mapDispatchToProps = dispatch => ({
  recipesAction: pageCount => dispatch(getAllRecipesAction(pageCount)),
  recipeSearch: searchContent => dispatch(recipeSearch(searchContent))
});

Home.defaultProps = {
  recipes: [],
  children: null,
  pageCount: 1
};

Home.propTypes = {
  recipesAction: PropTypes.func.isRequired,
  recipeSearch: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape),
  pageCount: PropTypes.number,
  children: PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
