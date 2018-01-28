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

  if (validator.isEmpty(formInput.lastName.trim())) {
    errors.lastName = 'Last name is required';
  }

  if (formInput.lastName.length < 3) {
    errors.lastName = 'Last name must be greater than 3 characters';
  }

  if (validator.isEmpty(formInput.emailAddress.trim())) {
    errors.emailAddress = 'Email is required';
  }

  if (!validator.isEmail(formInput.emailAddress)) {
    errors.emailAddress = 'Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
