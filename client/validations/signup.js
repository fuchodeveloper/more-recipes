import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (formInput) => {
  const errors = {};

  if (validator.isEmpty(formInput.firstName.trim())) {
    errors.firstName = 'First name is required';
  }

  if (formInput.firstName.length < 3) {
    errors.firstName = 'First name must be greater than 3 characters';
  }

  if (formInput.firstName.length > 20) {
    errors.firstName = 'First name is too long';
  }

  if (validator.isEmpty(formInput.lastName.trim())) {
    errors.lastName = 'Last name is required';
  }

  if (formInput.lastName.length < 3) {
    errors.lastName = 'Last name must be greater than 3 characters';
  }

  if (formInput.lastName.length > 20) {
    errors.lastName = 'Last name is too long';
  }

  if (validator.isEmpty(formInput.emailAddress.trim())) {
    errors.emailAddress = 'Email is required';
  }

  if (!validator.isEmail(formInput.emailAddress)) {
    errors.emailAddress = 'Email is invalid';
  }

  if (formInput.emailAddress.length > 20) {
    errors.emailAddress = 'Email address is too long';
  }

  if (validator.isEmpty(formInput.password)) {
    errors.password = 'password is required';
  }

  if (formInput.password.length < 6) {
    errors.password = 'Password must be greater than 6 characters';
  }

  if (formInput.password.length > 20) {
    errors.password = 'Password is too long';
  }

  if (!validator.equals(formInput.password, formInput.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (validator.isEmpty(formInput.passwordConfirmation)) {
    errors.passwordConfirmation = 'Confirm password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
