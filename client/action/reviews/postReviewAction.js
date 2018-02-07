import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_REVIEW } from '../types';

export const postReviewActionCreator = recipe => ({
  type: ADD_REVIEW,
  recipe
});

const postReviewAction = (param, userReview) =>
  dispatch => axios.post(`/api/v1/recipes/${param}/reviews`, userReview)
    .then((response) => {
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      dispatch(postReviewActionCreator(response.data.recipe.Reviews));
    })
    .catch(() => {
      alertify.logPosition('bottom right');
      alertify.error('An error occurred. Please try again');
    });

export default postReviewAction;
