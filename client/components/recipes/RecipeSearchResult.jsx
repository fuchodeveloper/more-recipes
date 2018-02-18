/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeSearchResult = props => (
  <div className="col-md-4 mb-2">
    <div className="card mt-1">
      <img
        className="card-img-top"
        max-width="348px"
        height="231px"
        src={props.details.image === ''
        ? 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg'
        : props.details.image}
        alt={props.details.name}
      />
      <div className="card-body">
        <h4 className="card-title">{props.details.name}</h4>
        <p className="card-text">
          {`${props.details.direction.slice(0, 100)}...`}
        </p>
        <div className="card-footer custom-card-footer-bg">
          <p className="card-text">
            <small className="text-muted">
              {props.details.views}
              <i className="fa fa-eye" aria-hidden="true" /> .
            {props.details.upVotes}
              <i className="fa fa-thumbs-up" aria-hidden="true" /> .
            {props.details.favoriteCount}
              <i className="fa fa-star" aria-hidden="true" />
            </small>
          </p>
          <Link
            to={`/recipes/${props.details.id}`}
            className="btn btn-primary btn-primary-color"
          >View Recipe
          </Link>
        </div>
      </div>
    </div>
  </div>
);

RecipeSearchResult.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    upVotes: PropTypes.number.isRequired,
    downVotes: PropTypes.number.isRequired,
    favoriteCount: PropTypes.number.isRequired
  }).isRequired,

};

export default RecipeSearchResult;
