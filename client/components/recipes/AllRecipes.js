import React from 'react';
import { Link } from 'react-router-dom';
import noodles from '../../assets/img/noodles.jpg';

const AllRecipes = props => (
      <div className="col-md-4 mb-2">
          <div className="card mt-1">
            <img className="card-img-top" max-width="348px" height="231px" src={props.details.recipeImage === '' ? noodles : props.details.recipeImage} alt={props.details.recipeName}/>
            <div className="card-body">
                <h4 className="card-title">{props.details.recipeName}</h4>
                <p className="card-text">{`${props.details.recipeDirection.slice(0, 100)}...`}</p>
                <div className="card-footer custom-card-footer-bg">
                    <p className="card-text"><small className="text-muted">{props.details.views} <i className="fa fa-eye" aria-hidden="true"/> . {props.details.upVotes} <i className="fa fa-thumbs-up" aria-hidden="true"/> . {props.details.favoriteCount} <i className="fa fa-star" aria-hidden="true"/></small></p>
                    <Link to={`/recipes/${props.details.id}`} className="btn btn-primary btn-primary-color">View Recipe</Link>
                </div>
            </div>
        </div>
      </div>
);

export default AllRecipes;
