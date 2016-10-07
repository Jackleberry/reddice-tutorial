import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

export default function ValidateInput(data) {
  let errors = {};

  if (Validator.isNull(data.title)) {
    errors.title = 'This is a required field.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
