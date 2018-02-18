/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AllMostUpvotes = props => (
  <div className="col-md-4 mb-5">
    <div className="card mt-1">
      <img
        className="card-img-top"
        max-width="348px"
        height="231px"
        src={props.details.image === '' ?
        'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg'
        : props.details.image}
        alt={props.details.name}
      />
      <div className="card-body">
        <h4 className="card-title favorite-recipe-title">
          <strong>{props.details.name}</strong>
        </h4>
        <p className="card-text recipe-font-family">
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

AllMostUpvotes.defaultProps = {
  details: {
    favoriteCount: 0,
    upVotes: 0
  }
};

AllMostUpvotes.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    upVotes: PropTypes.number,
    favoriteCount: PropTypes.number,
  })
};

export default AllMostUpvotes;
