import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_REVIEW } from '../types';

export const postReviewAction = recipe => ({
  type: ADD_REVIEW,
  recipe
});

const postRecipeReview = (param, userReview) => (dispatch) => {
  axios.post(`/api/v1/recipes/${param}/reviews`, userReview)
    .then((response) => {
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      dispatch(postReviewAction(response.data.recipe));
    })
    .catch(() => {
      alertify.logPosition('bottom right');
      alertify.error('An error occurred. Please try again');
    });
};

export default postRecipeReview;
