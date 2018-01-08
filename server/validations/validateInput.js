import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (validator.isEmpty(data.emailAddress)) {
    errors.emailAddress = 'Email is required';
  }

  if (!validator.isEmail(data.emailAddress)) {
    errors.emailAddress = 'Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
