import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_REVIEW, ADD_REVIEW_FAIL } from '../types';
import networkError from '../networkError';

/**
 * @description function to add review
 *
 * @param {Object} review add review object
 *
 * @returns {Object} review returns recipe review
 */
const postReviewActionCreator = review => ({
  type: ADD_REVIEW,
  review
});

/**
 * @description function to return review error
 *
 * @param {Object} error the review error object parameter
 *
 * @returns {Object} error returns error object
 */
const postReviewActionError = error => ({
  type: ADD_REVIEW_FAIL,
  error
});

/**
 * @description add review to recipe
 *
 * @param {Number} id recipe id
 * @param {Object} userReview user review object parameter
 *
 * @returns {Object} review returns the recipe review
 */
const postReviewAction = (id, userReview) =>
  dispatch => axios.post(`/api/v1/recipes/${id}/reviews`, userReview)
    .then((response) => {
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      dispatch(postReviewActionCreator(response.data.recipe.Reviews));
    })
    .catch((error) => {
      if (!error.response) {
        return networkError(error);
      }
      alertify.logPosition('bottom right');
      alertify.error('An error occurred. Please try again');
      dispatch(postReviewActionError(error.response.data));
    });

export default postReviewAction;
