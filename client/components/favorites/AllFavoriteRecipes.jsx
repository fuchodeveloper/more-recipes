import React from 'react';
import { Link } from 'react-router-dom';
import noodles from '../../assets/img/noodles.jpg';

class AllFavoriteRecipes extends React.Component {
  render() {
    const { details } = this.props;

    return (
      <div className="col-md-4 mb-5">
        <div className="card mt-1">
          <img className="card-img-top" max-width="348px" height="231px" src={details.Recipe.recipeImage === '' ? noodles : details.Recipe.recipeImage} alt={details.Recipe.recipeName} />
          <div className="card-body">
            <h4 className="card-title favorite-recipe-title"><strong>{details.Recipe.recipeName}</strong></h4>
            <p className="card-text recipe-font-family">{`${details.Recipe.recipeDirection.slice(0, 100)}...`}</p>
            <div className="card-footer custom-card-footer-bg">
              <p className="card-text"><small className="text-muted">{details.Recipe.views} <i className="fa fa-eye" aria-hidden="true" /> . {details.Recipe.upVotes} <i className="fa fa-thumbs-up" aria-hidden="true" /> . {details.Recipe.favoriteCount} <i className="fa fa-star" aria-hidden="true" /></small></p>
              <Link to={`/recipes/${details.Recipe.id}`} className="btn btn-primary btn-primary-color">View Recipe</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllFavoriteRecipes;
