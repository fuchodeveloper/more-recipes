import React from 'react';
import { Link } from 'react-router-dom';
import noodles from '../../assets/img/noodles.jpg';

class AllRecipes extends React.Component {
  
  render() {
    const { details } = this.props;

    return (      
      <div className="col-md-4 mb-2">
          <div className="card mt-1">
            <img className="card-img-top" src={noodles} alt="Recipe image"/>
            <div className="card-body">
                <h4 className="card-title">{details.recipeName}</h4>
                <p className="card-text">{details.recipeDirection}</p>
                <div className="card-footer custom-card-footer-bg">
                    <p className="card-text"><small className="text-muted">{details.views} <i className="fa fa-eye" aria-hidden="true"/> . {details.upVotes} <i className="fa fa-thumbs-up" aria-hidden="true"/> . 42 <i className="fa fa-star" aria-hidden="true"/></small></p>
                    <Link to={`/api/v1/recipes/${details.id}`} className="btn btn-primary btn-primary-color">View Recipe</Link>
                </div>
            </div>
        </div>
      </div>

        

      
      
    );
  }
}

export default AllRecipes;

