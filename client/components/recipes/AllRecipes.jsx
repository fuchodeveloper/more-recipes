/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AllRecipes = props => (
  <div className="col-md-4 mb-2">
    <div className="card mt-1">
      <img
        id="image"
        className="card-img-top"
        max-width="348px"
        height="231px"
        src={props.details.image === ''
        ? 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg'
        : props.details.image}
        alt={props.details.name}
      />
      <div className="card-body">
        <h4
          className="card-title"
          id="name"
        >{props.details.name.slice(0, 20)}...
        </h4>
        <p
          className="card-text"
          id="direction"
        >
          {`${props.details.direction.slice(0, 100)}...`}
        </p>
        <div className="card-footer custom-card-footer-bg">
          <p className="card-text">
            <small className="text-muted">
              {props.details.views} &nbsp;
              <i className="fa fa-eye" aria-hidden="true" /> .
              &nbsp;{props.details.upVotes}&nbsp;
              <i className="fa fa-thumbs-up" aria-hidden="true" /> .
              &nbsp;{props.details.favoriteCount} &nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </small>
          </p>
          <Link
            to={`/recipes/${props.details.id}`}
            className="btn btn-primary btn-primary-color"
            id="view-recipe-button"
          >View Recipe
          </Link>
        </div>
      </div>
    </div>
  </div>
);

AllRecipes.defaultProps = {
  details: {
    favoriteCount: 0,
    upVotes: 0
  }
};

AllRecipes.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    upVotes: PropTypes.number,
    favoriteCount: PropTypes.number,
  }),
};

export default AllRecipes;
