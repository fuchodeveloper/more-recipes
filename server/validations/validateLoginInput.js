import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateLoginInput = (data) => {
  const errors = {};

  if (validator.isEmpty(data.emailAddress.trim())) {
    errors.emailAddress = 'Email is required';
  }

  if (!validator.isEmail(data.emailAddress)) {
    errors.emailAddress = 'Email is invalid';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'password is required';
  }

  if (data.password.length < 6) {
    errors.password = 'Password must be greater than 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
