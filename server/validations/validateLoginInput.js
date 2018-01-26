import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateLoginInput = (formInput) => {
  const errors = {};

  if (validator.isEmpty(formInput.emailAddress.trim())) {
    errors.emailAddress = 'Email is required';
  }

  if (!validator.isEmail(formInput.emailAddress)) {
    errors.emailAddress = 'Email is invalid';
  }

  if (validator.isEmpty(formInput.password)) {
    errors.password = 'password is required';
  }

  if (formInput.password.length < 6) {
    errors.password = 'Password must be greater than 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
