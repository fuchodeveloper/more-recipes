import React from 'react';
import { Link } from 'react-router-dom';
import noodles from '../../assets/img/noodles.jpg';

const AllMostUpvotes = props => (
  <div className="col-md-4 mb-5">
    <div className="card mt-1">
      <img
        className="card-img-top"
        max-width="348px"
        height="231px"
        src={props.details.image === '' ? noodles : props.details.image}
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

export default AllMostUpvotes;
