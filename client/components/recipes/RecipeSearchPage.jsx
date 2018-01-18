import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import recipeSearch from '../../action/recipes/recipeSearchAction';
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
   * @param {any} props
   *
   * @memberof RecipeSearchPage
   */
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResult: {},
      touched: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
 * @description lifecycle method used to update state
 *
 * @param {any} nextProps
 *
 * @memberof RecipeSearchPage
 *
 * @returns {void}
 */
  componentWillReceiveProps(nextProps) {
    this.setState({ searchResult: nextProps.searchResult });
  }
  /**
 * @description handle input change
 *
 * @param {any} event
 *
 * @memberof RecipeSearchPage
 *
 * @returns {void}
 */
  onChange(event) {
    event.preventDefault();

    this.setState({ touched: true });
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 * @description handle form submission
 *
 * @param {any} event
 *
 * @memberof RecipeSearchPage
 *
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.recipeSearch(this.state.searchQuery);
    this.setState({ searchResult: {} });
  }
  /**
 * @description render JSX template
 *
 * @returns {html} html
 *
 * @memberof RecipeSearchPage
 */
  render() {
    return (
      <div>
        <div>

          <div className="container margin-top-70">

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
                { !isEmpty(this.state.searchResult) ?
                    Object
                      .keys(this.state.searchResult)
                      .map(key => (<RecipeSearchResult
                        key={key}
                        details={this.state.searchResult[key]}
                      />))
                    :
                    this.state.touched && <div><h1>No recipe found</h1></div>
                    }

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

RecipeSearchPage.propTypes = {
  searchResult: PropTypes.shape({}).isRequired,
  recipeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ searchResult }) => ({
  searchResult
});

const mapDispatchToProps = dispatch => ({
  recipeSearch: searchContent => dispatch(recipeSearch(searchContent))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearchPage);
