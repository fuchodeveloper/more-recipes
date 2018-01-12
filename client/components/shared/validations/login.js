import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};

  if (validator.isEmpty(data.emailAddress)) {
    errors.emailAddress = 'Email field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (data.password.length < 6) {
    errors.password = 'Password must be greater than 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
