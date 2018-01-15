import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};

  if (validator.isEmpty(data.firstName.trim())) {
    errors.firstName = 'First name is required';
  }

  if (data.firstName.length < 3) {
    errors.firstName = 'First name must be greater than 3 characters';
  }

  if (validator.isEmpty(data.lastName.trim())) {
    errors.lastName = 'Last name is required';
  }

  if (data.lastName.length < 3) {
    errors.lastName = 'Last name must be greater than 3 characters';
  }

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
