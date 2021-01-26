import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationError: Errors = {};

  err.inner.forEach(error => {
    validationError[error.path as string] = error.message;
  });

  return validationError;
}
