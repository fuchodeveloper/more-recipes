import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MyRecipesDetail = props => (
  <div className="col-md-4 mb-2" id="my-recipe-card">
    <div className="card mt-1">
      <img
        className="card-img-top"
        max-width="348px"
        height="231px"
        src={props.details.image === '' ?
        'https://res.cloudinary.com/fuchodeveloper/image/upload/'
              + 'v1516760699/noodles_c6ltkq.jpg' : props.details.image}
        alt={props.details.name}
      />
      <div className="card-body">
        <h4 className="card-title">
          {`${props.details.name.slice(0, 40)}...`}
        </h4>
        <p className="card-text">
          {`${props.details.direction.slice(0, 100)}...`}
        </p>
        <div className="card-footer custom-card-footer-bg">
          <p className="card-text">
            <small className="text-muted">
              {props.details.views}
            &nbsp;
              <i className="fa fa-eye" aria-hidden="true" /> .
              &nbsp; {props.details.upVotes} &nbsp;
              <i className="fa fa-thumbs-up" aria-hidden="true" /> .
              &nbsp; {props.details.favoriteCount} &nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </small>
          </p>
          <Link
            to={`/recipes/${props.details.id}`}
            className="btn btn-primary btn-primary-color"
          >
          View
          </Link> &nbsp;
          <a
            href="#"
            onClick={props.onConfirm}
            className="btn btn-danger"
            data-id={props.details.id}
          >Delete
          </a>&nbsp;
          <Link
            to={`/update/${props.details.id}`}
            className="btn btn-light"
            id="recipe-edit"
          >Edit
          </Link>
        </div>
      </div>
    </div>
  </div>
);

MyRecipesDetail.defaultProps = {
  onConfirm: () => {},
  details: {
    views: 0,
    id: 1,
    upVotes: 0,
    favoriteCount: 0
  }
};

MyRecipesDetail.propTypes = {
  onConfirm: PropTypes.func,
  details: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    views: PropTypes.number,
    id: PropTypes.number,
    upVotes: PropTypes.number,
    favoriteCount: PropTypes.number,
  }),
};

export default MyRecipesDetail;
