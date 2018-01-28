import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import mostUpvotesAction from '../../action/most-upvotes/mostUpvotesAction';
import AllMostUpvotes from './AllMostUpvotes';
/**
 * @description most upvotes class
 *
 * @class MostUpvotesPage
 *
 * @extends {React.Component}
 */
class MostUpvotesPage extends React.Component {
  /**
   * @description Creates an instance of MostUpvotesPage.
   *
   * @param {Object} props
   *
   * @memberof MostUpvotesPage
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: '',
      pageCount: ''
    }; // Initialize the state
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 * @description componentDidMount lifecycle
 *
 * @memberof MostUpvotesPage
 *
 * @returns {undefined}
 */
  componentDidMount() {
    this.props.mostUpvotesAction(this.state.pageCount);
  }
  /**
 * @description componentWillRecieveProps
 *
 * @param {Object} nextProps
 *
 * @memberof MostUpvotesPage
 *
 * @returns {undefined}
 */
  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    const { pageCount } = nextProps;
    this.setState({ recipes, pageCount });
  }

  /**
 * @description function to handle page number change
 *
 * @param {Number} current
 *
 * @memberof MostUpvotesPage
 *
 * @returns {undefined}
 */
  onPageChange(current) {
    current.selected += 1;
    this.props.mostUpvotesAction(current.selected);
  }

  /**
 * @description render MostUpvotesPage template
 *
 *
 * @memberof MostUpvotesPage
 *
 * @returns  {JSX} JSX representation of component
 */
  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    if (this.state.recipes.length > 0) {
      return (
        <div>

          <div className="container margin-top-70">

            <div>
              <h1 className="text-center p-4 center-hero-title">
              Most Upvoted Recipes
              </h1>
            </div>

            <div className="margin-top-50 margin-bottom-50" />

            <div className="row">
              {
              Object
                .keys(this.state.recipes)
                .map(key => (<AllMostUpvotes
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

          <div className="clearfix m-5" />

        </div>
      );
    }

    return (
      <div>

        <div className="container margin-top-70">

          <div>
            <h1 className="text-center p-4 center-hero-title">
            Most Upvoted Recipes
            </h1>
          </div>

          <div className="margin-top-50 margin-bottom-50" />

          <div className="row">
            <h2><i className="recipe-title">No upvoted recipes</i></h2>
          </div>

        </div>

        <div className="clearfix m-5" />


      </div>
    );
  }
}

const mapStateToProps = state => ({
  pageCount: state.recipesReducer.pageCount,
  recipes: state.recipesReducer.recipes
});

const mapDispatchToProps = dispatch => ({
  mostUpvotesAction: pageCount => dispatch(mostUpvotesAction(pageCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(MostUpvotesPage);
