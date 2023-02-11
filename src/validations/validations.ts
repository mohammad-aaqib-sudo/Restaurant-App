import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});
