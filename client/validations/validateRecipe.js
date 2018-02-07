import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateRecipe = (formInput) => {
  const errors = {};

  if (validator.isEmpty(formInput.name.trim())) {
    errors.name = 'Recipe name is required';
  }

  if (validator.isEmpty(formInput.ingredients.trim())) {
    errors.ingredients = 'Recipe ingredients is required';
  }

  if (validator.isEmpty(formInput.direction.trim())) {
    errors.direction = 'Recipe ingredients is required';
  }

  if (formInput.name.length < 3) {
    errors.name = 'Name must be greater than 3 characters';
  }

  if (formInput.ingredients.length < 6) {
    errors.ingredients = 'Ingredients must be greater than 6 characters';
  }

  if (formInput.direction.length < 100) {
    errors.direction = 'Direction is too short';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRecipe;
