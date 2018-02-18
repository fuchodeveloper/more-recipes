import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateLogin = (formInput) => {
  const errors = {};

  if (validator.isEmpty(formInput.emailAddress.trim())) {
    errors.emailAddress = 'Email field is required';
  }

  if (!validator.isEmail(formInput.emailAddress)) {
    errors.emailAddress = 'Email is invalid';
  }

  if (formInput.emailAddress.length > 20) {
    errors.lastName = 'Email address is too long';
  }

  if (validator.isEmpty(formInput.password)) {
    errors.password = 'Password field is required';
  }

  if (formInput.password.length < 6) {
    errors.password = 'Password must be greater than 6 characters';
  }

  if (formInput.password.length > 20) {
    errors.password = 'Password is too long';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLogin;
