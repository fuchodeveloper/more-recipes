import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

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
  if (!validator.equals(data.password, data.password_confirmation)){
    errors.password_confirmation = 'Passwords must match';
  }
  if (validator.isEmpty(data.password_confirmation)) {
    errors.password_confirmation = 'Confirm password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

