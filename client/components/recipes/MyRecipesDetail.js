import React from 'react';
import { Link } from 'react-router-dom';
import noodles from '../../assets/img/noodles.jpg';

class MyRecipesDetail extends React.Component {
  render() {
    const { details } = this.props;

    return (
      <div className="col-md-4 mb-2">

        <div className="card mt-1">
            {/* <img className="card-img-top" src="./img/noodles.jpg" alt="Card image cap" /> */}
            <img className="card-img-top" max-width="348px" height="231px" src={details.recipeImage === '' ? noodles : details.recipeImage} alt={details.recipeName}/>
            <div className="card-body">
              <h4 className="card-title">{details.recipeName}</h4>
              <p className="card-text">{`${details.recipeDirection.slice(0, 100)}...`}</p>
              <div className="card-footer custom-card-footer-bg">
                  <p className="card-text"><small className="text-muted">{details.views} <i className="fa fa-eye" aria-hidden="true"/> . {details.upVotes} <i className="fa fa-thumbs-up" aria-hidden="true"/> . {details.favoriteCount} <i className="fa fa-star" aria-hidden="true"/></small></p>
                  <Link to={`/recipes/${details.id}`} className="btn btn-primary btn-primary-color">View Recipe</Link> &nbsp; <Link to={`/edit_recipe/${details.id}`} className="btn btn-light">Edit Recipe</Link>
              </div>
            </div>
        </div>

      </div>
    );
  }
}

export default MyRecipesDetail;
