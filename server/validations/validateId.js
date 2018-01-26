/* eslint-disable no-restricted-globals */
const validateId = (recipeId) => {
  let error;
  if (!recipeId) {
    error = 'Recipe id is required.';
  }

  if (isNaN(recipeId)) {
    error = 'Recipe id is invalid!';
  }

  return {
    error
  };
};

export default validateId;
