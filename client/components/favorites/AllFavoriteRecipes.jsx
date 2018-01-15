import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import placeholderImage from '../../assets/img/noodles.jpg';

const AllFavoriteRecipes = props => (
  <div className="col-md-4 mb-5">
    <div className="card mt-1">
      <img
        className="card-img-top"
        max-width="348px"
        height="231px"
        src={props.details.Recipe.recipeImage === ''
          ? placeholderImage
          :
            props.details.Recipe.recipeImage}
        alt={props.details.Recipe.recipeName}
      />
      <div className="card-body">
        <h4 className="card-title favorite-recipe-title">
          <strong>{props.details.Recipe.recipeName}</strong>
        </h4>
        <p className="card-text recipe-font-family">
          {`${props.details.Recipe.recipeDirection.slice(0, 100)}...`}
        </p>
        <div className="card-footer custom-card-footer-bg">
          <p className="card-text">
            <small className="text-muted">
              {props.details.Recipe.views}
              <i className="fa fa-eye" aria-hidden="true" /> .
              {props.details.Recipe.upVotes}
              <i className="fa fa-thumbs-up" aria-hidden="true" /> .
              {props.details.Recipe.favoriteCount}
              <i className="fa fa-star" aria-hidden="true" />
            </small>
          </p>
          <Link
            to={`/recipes/${props.details.Recipe.id}`}
            className="btn btn-primary btn-primary-color"
          >View Recipe
          </Link>
        </div>
      </div>
    </div>
  </div>
);

AllFavoriteRecipes.propTypes = {
  details: PropTypes.objectOf(String).isRequired
};

export default AllFavoriteRecipes;
