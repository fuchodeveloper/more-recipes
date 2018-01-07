import React from 'react';

const RecipeReviews = props =>

  /**
   * Get the review and the first name of the user who posted a review
   *
   * @memberof RecipeReviews
   */

  (
      <div>
        { props.review.review ? (
           <div>
             <span className="text-muted"><em>{props.review.User.firstName} said:</em></span>
            <p>{props.review.review} </p>
          </div>
        ) : 'no reviews' }

      </div>
  );
export default RecipeReviews;
