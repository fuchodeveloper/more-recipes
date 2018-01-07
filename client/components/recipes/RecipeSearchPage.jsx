import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import Header from '../navigation/Header';
import recipeSearch from '../../action/recipes/recipeSearchAction';
import RecipeSearchResult from './RecipeSearchResult';
import recipePlaceholder from '../../assets/img/recipe_placeholder.png';

class RecipeSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      recipes: '',
      searchResult: '',
      touched: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchResult: nextProps.searchResult });
  }

  onChange(e) {
    e.preventDefault();

    this.setState({ touched: true });
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.recipeSearch(this.state.searchQuery);
    this.setState({ searchResult: {} });
  }

  render() {
    return (
      <div>
         <div>

          {/* Header component for navigation */}
          <Header />

            <div className="container margin-top-70">

                <div>

                </div>
                <form onSubmit={ this.onSubmit } >

                    <div className="input-group mt-2 mb-2 p-1">

                        <input
                          type="text"
                          className="form-control p-3"
                          placeholder="Try: 'Jollof Rice' "
                          aria-describedby="basic-addon2"
                          name="searchQuery"
                          value={ this.state.searchQuery }
                          onChange={ this.onChange }
                          required
                          autoFocus={true}
                        />

                        <input type="submit" value="SEARCH" className="btn btn-primary input-group-addon"/>

                    </div>


                    {
                      isEmpty(this.props.searchResult) ?
                      <div className="text-center mt-5">
                        <img src={recipePlaceholder} width="50%" max-height="50%" alt="No recipe"/>
                      </div>
                     : 'not empty'
                    }

                </form>
                <div className="margin-top-50 margin-bottom-50"/>

                <div>
                  <div className="row">
                  { !isEmpty(this.state.searchResult) ?
                    Object
                      .keys(this.state.searchResult)
                      .map(key => <RecipeSearchResult key={key} details={this.state.searchResult[key]} />)
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

const mapStateToProps = ({ searchResult }) => ({
  searchResult
});

const mapDispatchToProps = dispatch => ({
  recipeSearch: searchContent => dispatch(recipeSearch(searchContent))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearchPage);
