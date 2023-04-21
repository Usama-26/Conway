import * as Yup from 'yup';

export const requestErrorHandler = (err: any) => {
  const statusCode = err.response?.status || 500;
  const errorMeassage =
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.response?.error ||
    err?.message ||
    'Unknown request error!';
  const errors = err.response?.data.errors;
  let formattedErrors: {message: string; field?: string}[];
  console.log('errors', errors);
  if (errors && typeof errors !== 'string') {
    formattedErrors = errors.map((error: Yup.ValidationError) => {
      return {message: error.message, field: error.path};
    });
  } else {
    formattedErrors = [
      {
        message:
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.response?.error ||
          err?.message ||
          'Unknown request error!',
      },
    ];
  }
  return {statusCode, errorMessages: formattedErrors, errorMeassage};
};
