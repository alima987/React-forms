import * as yup from 'yup';
export const schema = yup.object().shape({
    name: yup.string().required('Name is required').matches(/^[A-Z]/, 'Name should start with an uppercase letter'),
    age: yup.number().positive().integer().required('Age is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8) .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/,
        'Password should contain at least 8 characters, including 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character'
      ),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.mixed().defined().required('Gender is required'),
    accept: yup.boolean().required("Required").oneOf([true], "You must accept the terms"),
    })