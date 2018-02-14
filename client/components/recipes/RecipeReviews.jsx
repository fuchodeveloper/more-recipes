import React from 'react';

export const RecipeReviews = props =>

  /**
   * @description Get the review and first name of review creator
   *
   * @memberof RecipeReviews
   */

  (
    <div>
      { props.review.review ? (
        <div>
          <span className="text-muted">
            <em id="review-creator">{props.review.User.firstName} said:</em>
          </span>
          <p id="new-review-body">{props.review.review} </p>
        </div>
        ) : 'no reviews' }

    </div>
  );

export default RecipeReviews;
