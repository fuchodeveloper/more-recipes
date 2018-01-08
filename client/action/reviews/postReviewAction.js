import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import alertify from 'alertify.js';
import { ADD_REVIEW } from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const postReviewAction = recipe => ({
  type: ADD_REVIEW,
  recipe
});

const postRecipeReview = (param, userReview) => (dispatch) => {
  // dispatch(setFetching());

  axios.post(`/api/v1/recipes/${param}/reviews`, userReview)
    .then((response) => {
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      // dispatch(batchActions([
      dispatch(postReviewAction(response.data.recipe));
      // dispatch(unsetFetching());
      // ]));
    })
    .catch((error) => {
      alertify.logPosition('bottom right');
      alertify.error(error.message);
      // dispatch(unsetFetching());
    });
};

export default postRecipeReview;
