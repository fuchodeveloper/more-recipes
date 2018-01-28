import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (formInput) => {
  const errors = {};

  if (validator.isEmpty(formInput.emailAddress.trim())) {
    errors.emailAddress = 'Email field is required';
  }

  if (validator.isEmpty(formInput.password)) {
    errors.password = 'Password field is required';
  }

  if (formInput.password.length < 6) {
    errors.password = 'Password must be greater than 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
