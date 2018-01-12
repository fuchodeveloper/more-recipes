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
  if (validator.isEmpty(data.password)) {
    errors.password = 'password is required';
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Confirm password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
