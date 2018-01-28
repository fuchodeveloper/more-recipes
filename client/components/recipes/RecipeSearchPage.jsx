import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import recipeSearchAction from '../../action/recipes/recipeSearchAction';
import RecipeSearchResult from './RecipeSearchResult';

/**
 * @description recipe search class
 *
 * @class RecipeSearchPage
 *
 * @extends {Component}
 */
class RecipeSearchPage extends Component {
  /**
   * Creates an instance of RecipeSearchPage.
   *
   * @param {Object} props
   *
   * @memberof RecipeSearchPage
   */
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      recipes: {},
      pageCount: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 * @description lifecycle method used to update state
 *
 * @param {Object} nextProps
 *
 * @memberof RecipeSearchPage
 *
 * @returns {void}
 */
  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    const { pageCount } = nextProps;
    this.setState({ recipes, pageCount });
  }

  /**
 * function to handle page number change
 *
 * @param {Number} current
 *
 * @memberof MyRecipesPage
 *
 * @returns {undefined}
 */
  onPageChange(current) {
    current.selected += 1;
    this.props.recipeSearchAction(current.selected);
  }

  /**
 * @description handle input change
 *
 * @param {Object} event
 *
 * @memberof RecipeSearchPage
 *
 * @returns {undefined}
 */
  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description handle form submission
 *
 * @param {Object} event
 *
 * @memberof RecipeSearchPage
 *
 * @returns {undefined}
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.recipeSearchAction(this.state.searchQuery, this.state.pageCount);
    this.setState({ recipes: {} });
  }
  /**
 * @description render JSX template
 *
 * @returns {html} html
 *
 * @memberof RecipeSearchPage
 */
  render() {
    const containerClassName = 'container pagination justify-content-center';
    return (
      <div>
        <div>

          <div className="container margin-top-70">

            <div />
            <form onSubmit={this.onSubmit} >
              <div className="display-5" id="search-header">
                Search for your favorite recipes
              </div>

              <div className="input-group mt-2 mb-2 p-1">

                <input
                  type="text"
                  id="searchQuery"
                  className="form-control p-3"
                  placeholder="Try: 'Jollof Rice' "
                  aria-describedby="searchQuery"
                  name="searchQuery"
                  value={this.state.searchQuery}
                  onChange={this.onChange}
                  required
                  autoFocus
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
              <div className="row">
                {
                  Object
                  .keys(this.state.recipes)
                  .map(key => (<RecipeSearchResult
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
                  containerClassName={containerClassName}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  activeClassName="page-item active"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  onPageChange={this.onPageChange}
                  disableInitialCallback
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

RecipeSearchPage.propTypes = {
  recipes: PropTypes.shape({}).isRequired,
  recipeSearchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipesReducer.recipes
});

const mapDispatchToProps = dispatch => ({
  recipeSearchAction: searchQuery => dispatch(recipeSearchAction(searchQuery))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeSearchPage);
